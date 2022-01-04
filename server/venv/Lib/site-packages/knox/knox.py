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
from . import backend as backend
from . import config as config


class Knox:
    """Composite class for Knox package"""
    _conf: config.Conf
    _store: backend.Store
    _stores: dict
    _ctx: dict

    def __init__(self, ctx: dict) -> None:
        """Constructor for Knox """
        self._ctx = ctx
        self._conf = config.Conf(ctx.obj['LOG_LEVEL'])
        self._conf.settings.set('CTX', ctx)
        self._store = backend.Store(self._conf.settings)
        self._stores = {}

    @property
    def settings(self) -> config.Conf.settings:
        """Access to the Dynaconf settings object"""
        return self._conf.settings

    @property
    def conf(self) -> config.Conf:
        """Access to the knox Conf object"""
        return self._conf

    @property
    def store(self) -> backend.Store:
        """Access to the default store engine"""
        return self._store

    def stores(self, engine_name: str = None) -> backend.Store:
        """Retrieve a named store, otherwise the default store"""
        return self._stores[engine_name] if engine_name is not None else self._store

    def attach(self, engine_name: str) -> bool:
        """Instantiate an additional store"""
        self._stores[engine_name] = backend.Store(self._conf.settings, engine_name)
