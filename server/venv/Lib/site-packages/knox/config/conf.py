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

from dynaconf.loaders.vault_loader import list_envs
"""
import pkg_resources
from dynaconf import settings
from loguru import logger


class Conf:
    """Manage application settings"""
    _version: str
    log_level = "INFO"
    _banner = "\n______ __\n" \
              "___  //_/________________  __\n" \
              "__  ,<  __  __ \  __ \_  |/_/\n" \
              "_  /| | _  / / / /_/ /_>  <\n" \
              "/_/ |_| /_/ /_/\____//_/|_|\n"  # noqa: W605

    def __init__(self, loglevel=None) -> None:
        """Constructor for Settings"""
        if hasattr(settings, 'LOG_LEVEL'):
            self.set_loglevel(settings.LOG_LEVEL)
        if loglevel:
            self.set_loglevel(loglevel)
        self._version = pkg_resources.get_distribution("knox").version
        self._settings = settings
        logger.debug(f'{self._banner} 🏰 Knox version {self._version}\n')
        logger.debug("Settings managed with Dynaconf, learn more at http://github.com/rochacbruno/dynaconf")
        logger.debug(f'dynaconf loaded? {self._settings.configured}')

    @classmethod
    def log_filter(cls, record) -> bool:
        levelno = logger.level(cls.log_level).no
        return record["level"].no >= levelno

    @classmethod
    def set_loglevel(cls, level: str) -> None:
        cls.log_level = level

    @property
    def version(self) -> str:
        return self._version

    @property
    def settings(self) -> settings:
        return self._settings
