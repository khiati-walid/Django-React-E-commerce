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
from loguru import logger

from .store_acm import ACMStoreEngine
from .store_engine import StoreEngine
from .store_file import FileStoreEngine
from .store_object import StoreObject
from .store_vault import VaultStoreEngine


class Store:
    """Abstract class to generalize access to the different stores"""
    _engine: StoreEngine
    _engine_name: str
    _engine_map = {
        'vault': VaultStoreEngine,
        'file': FileStoreEngine,
        'aws': ACMStoreEngine
    }

    def __init__(self, settings, engine_name: str = "vault") -> None:
        """Dynamically load StoreEngine type from .env via Dynaconf
        KNOX_STORE_ENGINE=[vault,file,aws]

        :param settings: Dynaconf LazySettings
        :type settings: dynaconf.LazySettings
        :param engine_name: String indicating which StoreEngine to instantiate
        :type engine_name: String
        """
        try:
            self._engine_name = engine_name if engine_name is not None else settings.STORE_ENGINE
            self._engine = self._engine_map.get(self._engine_name).__call__(settings)
        except Exception:
            logger.error(
                f'StoreEngineFailure KNOX_STORE_ENGINE={self._engine_name} is invalid. Valid options are {self._engine_map.keys()}')  # noqa: E501
            raise

        self._engine.settings = settings
        logger.debug(f'Loaded {self._engine.__class__}')

    def save(self, obj: StoreObject) -> bool:
        """Save the given object to persistence"""
        return self._engine.write(obj)

    def get(self, path: str, name: str, type=None) -> StoreObject:
        """Given path read object"""
        return self._engine.read(path, name, type)

    def delete(self, path: str, name: str) -> bool:
        """Remove the object from the store"""
        """[TODO 5/13/20] ljohnson implement soft delete and hard deletes"""
        return self._engine.delete(path, name)

    def find(self, pattern: str) -> list:
        """Given a pattern, return collection of all objects
           Search patterns : abc.8x8.com, abc.8x8.com/*, 8x8.com/*
        """
        return self._engine.find(pattern)

    def subjectaltfind(self, pattern: str) -> list:
        """Fetch the certificate information based on subject alternative name
        """
        return self._engine.subjectaltfind(pattern)
