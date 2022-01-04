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

import os
import subprocess

from loguru import logger


class CertDnsEngine:
    """Data driven certificate verification DNS providers"""

    def __init__(self, settings):
        """DNS Engine for generating certificates

            :param settings: dynaconf settings
            :type settings: json
        """
        self._settings = settings
        """[TODO 5/30/20] ljohnson use dynaconf's Vault backend to load these credentials"""
        self._domain_metadata = self._settings.as_dict()['KNOX_DNS_METADATA']
        self._certbot_conf = self._settings.as_dict()['KNOX_CERTBOT_CONFIG']

    def get_provider(self, common_name: str) -> str:
        """Find the DNS provider plugin that is authoritative for the common name

            What DNS service is being used as the authoritative server of the
            given domain? Route53? Cloudflare? etc.

            This is required to complete the ACME ownership challenge with certbot.

            Provider credentials and associating domains are configurable via KNOX_DNS_METADATA.

            See config/settings.json

            :param common_name: The common name being used to generate a certificate
            :type common_name: str
            :returns: str
        """
        domain_suffix = '.'.join(common_name.split('.')[1:])

        """Validate if a domain name derived from common name is supported"""
        for provider in self._domain_metadata:
            domains = self._domain_metadata[provider]['domains']
            if domain_suffix in domains:
                logger.info(f' Domain name {domain_suffix} supported by {provider}')
                return provider

        logger.error(f'No provider found supporting {domain_suffix}')

    def validate_provider_credentials(self, provider: str) -> bool:
        """Validate if provider credentials are present

            Every DNS provider have a set of credentials to authenticate.
            This function validates if the required credentials are present.

            See config/settings.json for required credentials

            :param provider: Provider name to verify the credentials
            :type provider: str
            :returns: bool
        """

        credentials_list = self._domain_metadata.get(provider).get('required_credentials')
        try:
            for credential in credentials_list:
                if os.environ[credential]:
                    pass
            return True
        except Exception:
            logger.error(f'Provider credentials for {provider} are not set/valid')
            return False

    def provider_cmd(self, plugin: str, name: str) -> str:
        """Generate DNS provider specific certbot commands

            :param plugin: certbot args for specific dns provider
            :type plugin: str
            :param name: certificate common name
            :type name: str
            :returns str
        """
        command = f'certbot certonly -n --agree-tos --{plugin} -d {name}'
        return command

    def call_provider(self, name: str) -> tuple:
        """Generate certificate using certbot by calling specific provider args

            Get the provider name and verify their credentials.
            If both are set and True, run the certbot commands with
            specific provider plugin arguments

            :param name:  The common name being used to generate a certificate
            :type name: str
            :returns tuple
        """
        root_dir = self._certbot_conf.get('KNOX_CERTBOT_ROOT_DIR')
        work_dir = f'{root_dir}/var/lib/letsencrypt'
        logs_dir = f'{root_dir}/var/log/letsencrypt'
        conf_dir = f'{root_dir}/etc/letsencrypt'
        email_id = self._certbot_conf.get('KNOX_CERTBOT_ACCOUNT_EMAIL')
        provider_name = self.get_provider(name)
        if provider_name:
            if self.validate_provider_credentials(provider_name):
                logger.info(f' Calling provider {provider_name} for {name}')
                provider_cmd = self.provider_cmd(provider_name, name)
                certbot_command = f'{provider_cmd} ' \
                                  f'--email {email_id} ' \
                                  f'--work-dir {work_dir} ' \
                                  f'--logs-dir {logs_dir} ' \
                                  f'--config-dir {conf_dir}'
                response = subprocess.run(certbot_command,
                                          shell=True,
                                          stdout=subprocess.PIPE,
                                          stderr=subprocess.STDOUT)
                if response.returncode == 0:
                    certfile_path = f'{conf_dir}/live/{name}/cert.pem'
                    chainfile_path = f'{conf_dir}/live/{name}/chain.pem'
                    privkey_path = f'{conf_dir}/live/{name}/privkey.pem'
                    return certfile_path, chainfile_path, privkey_path
                else:
                    logger.error(f'Certbot return code {response.returncode} none zero')
            else:
                logger.error(f'Credentials not found for {provider_name} provider')
        else:
            logger.error(f'No DNS provider found for {name}')
