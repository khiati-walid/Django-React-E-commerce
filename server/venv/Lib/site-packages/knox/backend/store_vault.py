"""
Apache Software License 2.0

Copyright (c) 2020, 8x8, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License."""
import json
import sys
from datetime import datetime

import hvac
import requests
import validators
from dynaconf import LazySettings
from loguru import logger

from .store_engine import StoreEngine
from .store_object import StoreObject


class VaultClient:
    """Client commands not available via hvac"""

    __vault_client: hvac.Client

    __headers = {'Content-Type': 'application/json',
                 'X-Vault-Token': ''}
    __url: str            #: Vault server URL
    __token: str          #: Auth token
    __approle: str        #: Application Role ID
    __secretid: str       #: Application Role Secret ID
    __mount: str          #: Engine mount path
    __mounts: json        #: Map of Vault mounts

    match = 'False'

    def __init__(self, settings: LazySettings) -> None:
        """Constructor for VaultClient"""
        self.__url = settings.VAULT_URL
        self.__approle = settings.VAULT_APPROLE
        self.__secretid = settings.VAULT_SECRET_ID
        self.__mount = settings.VAULT_MOUNT
        self.__mounts = {}
        self.__vault_client = hvac.Client(url=self.__url)
        self.__settings = settings

    def initialize(self) -> bool:
        """During initialization, if in admin mode, ensure the kv mount point has been registered with Vault. To enable
        admin mode use the hidden param --admin with any command.

        knox --admin store find
        """
        if self.__settings.CTX.obj['ADMIN_MODE']:
            return self.new_mount(mount=self.mount)
        else:
            return self.connect()

    def connect(self) -> bool:
        """Knox uses an approle scheme to authenticate with Vault. This requires fetching a fresh, short lived, API
        token for every call to the API."""
        try:
            logger.trace(f'Connecting to Vault approle: {self.__approle} secret_id: {self.__secretid}')
            resp = self.__vault_client.auth.approle.login(role_id=self.__approle, secret_id=self.__secretid, use_token=True)
            self.__token = resp['auth']['client_token']
            logger.trace(f'client_token: {self.__token}')
            self.__headers['X-Vault-Token'] = self.__token
        except requests.exceptions.ConnectionError as err:
            logger.error(f'Failed to connect to {self.__url}: {err}')
            sys.exit(2)
        except hvac.exceptions.VaultError as err:
            logger.error(f'Failed to authenticate with Vault {err}')
            sys.exit(2)
        else:
            return True

    @property
    def url(self) -> str:
        return self.__url

    @property
    def mount(self) -> str:
        return self.__mount

    @property
    def token(self) -> str:
        return self.__token

    def logout(self) -> bool:
        return self.__vault_client.logout()

    def _get(self, path: str) -> json:
        """GET REST API wrapper method

            :param path: Vault API to query
            :type path: String
            :return: JSON paylod
        """
        try:
            """Connect refreshes the temp Vault auth token"""
            self.connect()
            response = requests.get(url=f'{self.__url}{path}', headers=self.__headers)
            response.raise_for_status()

            return json.loads(response.content.decode('utf-8'))

        except requests.exceptions.HTTPError as errh:
            logger.error(f'Http Error: {errh}')
        except requests.exceptions.ConnectionError as errc:
            logger.error(f'Error Connecting: {errc}')
        except requests.exceptions.Timeout as errt:
            logger.error(f'Timeout Error: {errt}')
        except requests.exceptions.RequestException as err:
            logger.error(f'Error: {err}')

    def _post(self, path: str, data: json) -> json:
        """POST REST API wrapper method

            :param path: Vault API to change or create
            :type path: String
            :param data: Required request body
            :type data: JSON
            :return: requests.Response object
        """
        try:
            """Connect refreshes the temp Vault auth token"""
            self.connect()
            response = requests.post(url=f'{self.__url}{path}', headers=self.__headers, data=data)
            response.raise_for_status()

            return json.loads(response.content.decode('utf-8'))

        except requests.exceptions.HTTPError as errh:
            logger.error(f'Http Error: {errh}')
        except requests.exceptions.ConnectionError as errc:
            logger.error(f'Error Connecting: {errc}')
        except requests.exceptions.Timeout as errt:
            logger.error(f'Timeout Error: {errt}')
        except requests.exceptions.RequestException as err:
            logger.error(f'Error: {err}')

    def _put(self, path: str, data: json) -> requests.Response:
        """PUT REST API wrapper method

            :param path: Vault API to change or create
            :type path: String
            :param data: Required request body
            :type data: JSON
            :return: requests.Response object
        """
        try:
            """Connect refreshes the temp Vault auth token"""
            self.connect()
            response = requests.put(url=f'{self.__url}{path}', headers=self.__headers, data=data)
            response.raise_for_status()

            return response

        except requests.exceptions.HTTPError as errh:
            logger.error(f'Http Error: {errh}')
        except requests.exceptions.ConnectionError as errc:
            logger.error(f'Error Connecting: {errc}')
        except requests.exceptions.Timeout as errt:
            logger.error(f'Timeout Error: {errt}')
        except requests.exceptions.RequestException as err:
            logger.error(f'Error: {err}')

    def get_mounts(self) -> json:
        """Refresh set of mounts from Vault

            :return: JSON
        """
        self.__mounts = self._get("/v1/sys/mounts")
        return self.__mounts

    def new_mount(self, mount: str) -> bool:
        """Will create a vault mount of type k/v V2 if it doesn't exist

            :param mount: Name of the Vault K/V Secret Engine
            :type mount: String
            :return: Boolean
        """
        self.__mounts = self._get("/v1/sys/mounts")
        logger.trace(f'{self.__class__}::new_mount {self.__mounts}')
        if self.__mounts and f'{mount}/' not in self.__mounts['data'].keys():
            logger.info(f'Vault mount {self.__url}/v1/sys/mounts/{mount} does not exist, creating')
            self._put(f'/v1/sys/mounts/{mount}', '{"type": "kv-v2"}')
            self.__mounts = self._get("/v1/sys/mounts")
        return bool(self.__mounts)

    def upsert(self, obj: StoreObject) -> bool:
        """Given a StoreObject create or update it into Vault. Metadata and content are stored separately to allow
        querying of non sensitive details.

            :param obj: The object to store
            :type obj: StoreObject
            :return: Boolean
        """
        client = self.__vault_client
        if validators.domain(obj.name):
            mp = self.mount
            op = obj.path_name
        else:
            mp = f'{self.mount}'
            op = f'client/{obj.name}/{obj.type}'

        policyname = ""

        try:
            self.connect()
            logger.trace(f'updating secret {mp}/{op}/cert_body')
            client.secrets.kv.v2.create_or_update_secret(path=f'{op}/cert_body',
                                                         mount_point=mp,
                                                         secret=obj.data['cert_body'])

            self.connect()
            logger.trace(f'updating secret {mp}/{op}/cert_info')
            client.secrets.kv.v2.create_or_update_secret(path=f'{op}/cert_info',
                                                         mount_point=mp,
                                                         secret=obj.data['cert_info'])
            self.connect()
            list_policies_resp = client.sys.list_policies()['data']['policies']
            if 'commonName' in obj.data['cert_info']['subject']:
                commonname = obj.data['cert_info']['subject']['commonName']
            else:
                commonname = obj.name

            policyname = f'knox-read-{commonname}'
            if policyname in list_policies_resp:
                pass
            else:
                policy = obj.data['cert_policy']
                logger.debug(f'Creating explict read access policy {policyname} for {op}/cert_body')
                logger.trace(f'{self.__class__}::upsert {policyname}:\n{policy}')
                self.connect()
                client.sys.create_or_update_policy(name=policyname, policy=policy)

        except hvac.exceptions.Forbidden as ve:
            policyphrase = ""
            if len(policyname) > 0:
                policyphrase = f'and or {policyname}'
            logger.error(f'Permission denied writing {op} {policyphrase}: {ve}')
            sys.exit(2)
        except hvac.exceptions.InvalidPath as ve:
            policyphrase = ""
            if len(policyname) > 0:
                policyphrase = f'and or {policyname}'
            logger.error(f'Path invalid for {op} {policyphrase}: {ve}')
            sys.exit(2)
        except hvac.exceptions.Unauthorized as ve:
            policyphrase = ""
            if len(policyname) > 0:
                policyphrase = f'and or {policyname}'
            logger.error(f'Credentials not authorized to write {op} {policyphrase}: {ve}')
            sys.exit(2)
        except Exception as vex:
            logger.error(f'Failed to write StoreObject to Vault {vex}')
            sys.exit(2)
        else:
            logger.info(f'Successfully stored {op} and {policyname}')
            return True

    def read(self, path: str, name: str, type: str = None) -> tuple:
        """Given a path and name retrieve a tuple of dictionaries to create a StoreObject
            cert_body
            cert_info

            :param path: The path where the StoreObjects data is stored
            :type path: str
            :param name: Name of the StoreObject to retrieve
            :type name: str
            :param type: The type of StoreObject i.e. PEM
            :type type: str
        """
        client = self.__vault_client
        if type:
            fullpathbody = f'{path}/{name}/{type}/cert_body'
            fullpathinfo = f'{path}/{name}/{type}/cert_info'
        else:
            fullpathbody = f'{path}/{name}/cert_body'
            fullpathinfo = f'{path}/{name}/cert_info'

        try:
            self.connect()
            logger.trace(f'Attempting to read \n\tbody:{fullpathbody}\n\tinfo:{fullpathinfo}')
            logger.trace(f'client.url: {client.url}')
            logger.trace(f'mount: {self.mount}')
            certbody = client.secrets.kv.v2.read_secret_version(path=fullpathbody, mount_point=self.mount)
            self.connect()
            certinfo = client.secrets.kv.v2.read_secret_version(path=fullpathinfo, mount_point=self.mount)
            return certbody, certinfo

        except hvac.exceptions.Forbidden as ve:
            logger.error(f'Permission denied reading {path}/{name}: {ve}')
            sys.exit(2)
        except hvac.exceptions.InvalidPath as ve:
            logger.error(f'Path invalid for {path}/{name}: {ve}')
            sys.exit(2)
        except hvac.exceptions.Unauthorized as ve:
            logger.error(f'Credentials not authorized to read {path}/{name}: {ve}')
            sys.exit(2)

    def search(self, rootpath: str, rootkey: str, searchresults: list, pattern: str = None) -> list:
        """Search for 'cert_info' for a given vault path

            :param rootpath: Beginning search path
            :type rootpath: str
            :param rootkey: Used to get commonname from search path
            :type rootkey: str
            :param searchresults: Stores the search results..default is empty
            :type searchresults: list
            :param pattern: Unaltered search pattern
            :type pattern: str
            :return: list
        """
        try:
            client = self.__vault_client
            self.connect()
            rootpath = rootpath.replace('//', '/')
            logger.trace(f'Searching {rootpath}')
            secrets = client.secrets.kv.list_secrets(path=rootpath, mount_point=self.mount)
            secrets_keys = secrets.get('data').get('keys')
            if isinstance(secrets_keys, list):
                if 'cert_info' not in secrets_keys:
                    for key in secrets_keys:
                        subpaths = rootpath + key
                        self.search(rootpath=subpaths, rootkey=key, pattern=pattern, searchresults=searchresults)
                else:
                    cert_info_path = rootpath + "cert_info"
                    cert_common_name = rootpath.split('/')[-3]
                    self.connect()
                    cert_info = client.secrets.kv.v2.read_secret_version(path=cert_info_path,
                                                                         mount_point=self.mount)['data']['data']
                    cert_info_str = json.dumps(cert_info)

                    logger.trace(f'does {pattern} match {cert_info_str}')
                    if len(cert_info.keys()) > 0 and (pattern == "*" or cert_info_str.find(pattern) > 0):
                        logger.trace(f'yes, {pattern} matches {cert_info_str}')
                        current_date = datetime.now()
                        cert_expiry_date = datetime.strptime(cert_info['validity']['not_valid_after'],
                                                             '%Y-%m-%d %H:%M:%S')
                        days_to_expire = cert_expiry_date - current_date
                        results_dict = {'common_name': cert_common_name,
                                        'vault_cert_path': f'/{self.mount}{rootpath}',
                                        'cert_issue_date': cert_info['validity']['not_valid_before'],
                                        'cert_expiry_date': cert_info['validity']['not_valid_after'],
                                        'days_to_expire': days_to_expire.days
                                        }
                        if 'commonName' in cert_info['issuer']:
                            results_dict['issuer'] = cert_info['issuer']['commonName']
                        else:
                            results_dict['issuer'] = ""

                        if 'alternativeNames' in cert_info['subject']:
                            results_dict['alternativeNames'] = cert_info['subject']['alternativeNames']
                        else:
                            results_dict['alternativeNames'] = ""

                        searchresults.append(results_dict)
                    else:
                        logger.trace(f'no, {pattern} not found {cert_info_path}')
        except requests.exceptions.ConnectionError as ve:
            logger.error(f'Failed to connect to {self.__url}: {ve}')
            sys.exit(2)
        except hvac.exceptions.Forbidden as ve:
            logger.error(f'Permission denied for reading from {rootpath}: {ve}')
            sys.exit(2)
        except hvac.exceptions.InvalidPath as ve:
            logger.error(f'Path not found for {rootpath}: {ve}')
            sys.exit(2)
        except hvac.exceptions.Unauthorized as ve:
            logger.error(f'Credentials not authorized to access {rootpath}: {ve}')
            sys.exit(2)
        else:
            return searchresults


class VaultStoreEngine(StoreEngine):
    """Vault implementation of the StoreEngine interface"""
    __client: VaultClient

    def __init__(self, settings) -> None:
        """Constructor for VaultStoreEngine"""
        super().__init__()
        self._settings = settings
        self.__client = VaultClient(settings)
        logger.debug(f'🔐 Vault backend configuration loaded. {self.__client.url}')
        if self.initialize():
            logger.debug("🔐 Vault backend initialized.")
        else:
            logger.error(f'🛑 Failed to connect to Vault {self.__client.url}')

    def initialize(self) -> bool:
        """Ensure the Vault client is initialized"""
        return self.__client.initialize()

    def open(self) -> bool:
        """Ensure the Vault client is connected"""
        return self.__client.connect()

    def close(self) -> bool:
        """Ensure we close the vault connection"""
        return self.__client.logout()

    def __del__(self):
        """When the object is destroyed make sure we close the connection to Vault"""
        return self.close()

    def write(self, obj: StoreObject) -> bool:
        """Given a StoreObject, store it into vault using mount/path/name == body,info

            :param obj: The StoreObject to persist
            :type obj: StoreObject
            :return: bool
        """
        return self.__client.upsert(obj)

    def read(self, path: str, name: str, type=None) -> StoreObject:
        """Using the provided path and name retrieve the data from the store and create a new StoreObject

            :param path: Store path to the object
            :type path: str
            :param name: Name of the object to retrieve
            :type name: str
            :param type: StoreObject type, if known
            :type type: str
            :return: StoreObject
        """
        try:
            certbody, certinfo = self.__client.read(path, name, type)
            cert = StoreObject(name=name,
                               path=path,
                               body=certbody['data']['data'],
                               info=certinfo['data']['data'],
                               type=type)
            cert._data = {'cert_body': certbody['data']['data'],
                          'cert_info': certinfo['data']['data']}

        except Exception as vex:
            logger.error(f'Failed to read StoreObject /{self.__client.mount}{path}/{name} {vex}')
            sys.exit(2)
        else:
            logger.info(f' Successfully read {cert.path_name}')
            return cert

    def find(self, pattern) -> list:
        """Search certificate info for a given search pattern

            :param pattern: Search glob pattern
                ex: *, abc.8x8.com, abc.8x8.com/*, 8x8.com/*
            :type pattern: str

            :return: list
        """
        return self.__client.search(rootpath='/', rootkey="", pattern=pattern, searchresults=[])
