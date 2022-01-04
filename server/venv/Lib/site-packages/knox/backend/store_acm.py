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
limitations under the License.
"""
import ast
import sys

import boto3
from botocore.exceptions import ClientError
from botocore.exceptions import EndpointConnectionError
from dynaconf import LazySettings
from jinja2 import Environment
from jinja2 import FileSystemLoader
from loguru import logger

from .store_engine import StoreEngine
from .store_object import StoreObject


class ACMStoreEngine(StoreEngine):
    """
    ACMStoreEngine Class
    CRUD operations for Aws Certificate Manager
    """

    __AwsErrors = (ClientError, EndpointConnectionError)
    __session: boto3.session.Session

    def __init__(self, settings: LazySettings = None):
        super().__init__()
        self.profile_name = settings.AWS_PROFILE
        self.region = settings.AWS_REGION
        self.CertArn = None
        self.__path = None
        self._jinja = Environment(loader=FileSystemLoader('templates'))
        self._tmpl_tags = self._jinja.get_template('tags_template.js')
        if self.initialize():
            logger.debug('Connected to ACM')
        else:
            logger.error('No AWS profiles found')
            sys.exit(1)

    def initialize(self) -> bool:
        self.__session = boto3.Session(profile_name=self.profile_name, region_name=self.region)
        return len(self.__session.available_profiles) > 0

    def find(self, pattern: str) -> [StoreObject]:
        certs = []
        try:
            acm_res = self.__session.client('acm').list_certificates(
                CertificateStatuses=['ISSUED'],
                MaxItems=123
            )
            acm_certs = acm_res.get('CertificateSummaryList')
            for acm in acm_certs:
                domainname = acm['DomainName']
                arn = acm['CertificateArn']
                if domainname == pattern:
                    certs.append(self.get(name=domainname, arn=arn))

        except self.__AwsErrors as e:
            logger.error(f'[AWSCert]: Exception listing certificates from ACM {e}')
            sys.exit(1)
        else:
            return certs

    def get(self, name: str, arn: str) -> StoreObject:
        try:
            acm_res = self.__session.client('acm').get_certificate(
                CertificateArn=arn
            )
            cert = StoreObject(name=name)
            cert.public = acm_res.get('Certificate')
            if hasattr(acm_res, 'CertificateChain'):
                cert.chain = acm_res.get('CertificateChain')

        except self.__AwsErrors as e:
            logger.error(f'[AWSCert]: Exception listing certificates from ACM {e}')
            sys.exit(1)
        return cert

    def read(self, name: str, path: str = None, type=None) -> StoreObject:
        certs = self.find(name)
        for cert in certs:
            if cert.name == name:
                return cert

    def write(self, cert: StoreObject) -> bool:
        """ ACM Store Engine Write the certificate to specified region and account

            :param cert: The StoreObject to persist in AWS ACM Store
            :type cert: Cert
            :return: bool

        """
        logger.trace(f'[ACMStoreEngine]:\nPUB  :{cert.public}\nKEY  :REDACTED\nCHAIN:{cert.chain}\n')

        try:
            if len(cert.data['cert_body']['chain']) > 0:
                acm_res = self.__session.client('acm').import_certificate(
                    Certificate=cert.data['cert_body']['public'],
                    PrivateKey=cert.data['cert_body']['private'],
                    CertificateChain=cert.data['cert_body']['chain'],
                    Tags=ast.literal_eval(self._tmpl_tags.render(cert=cert))
                )
            else:
                acm_res = self.__session.client('acm').import_certificate(
                    Certificate=cert.data['cert_body']['public'],
                    PrivateKey=cert.data['cert_body']['private'],
                    Tags=ast.literal_eval(self._tmpl_tags.render(cert=cert))
                )

            cert.arn = acm_res.get('CertificateArn')
            logger.trace(
                f'[ACMStoreEngine]: Certificate uploaded:\n'
                f'Region: {self.region}\n'
                f'Account: {self.profile_name}\n'
                f'CertARN: {cert.arn}')
            return True

        except self.__AwsErrors as e:
            logger.error(f'[ACMStoreEngine]: Exception importing certificates to ACM {e}')
            sys.exit(1)
