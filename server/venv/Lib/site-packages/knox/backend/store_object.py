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
import hashlib
import json


class StoreObject:
    """Metadata interface for objects being persisted in a backend"""
    _name: str     #: Name of the objects store key
    _path: str     #: Path from store mount point to find store key
    _body: str     #: Content that will be persisted
    _info: str     #: Metadata about the object being stored
    _type: str     #: A way to classify StoreObjects
    _data: {}      #: Complete map of object
    _mount: str    #: Mount point
    _version: int  #: Store revision

    def __init__(self, name: str, path: str, body: str, info: str, type=None) -> None:
        """Constructor for StoreObject"""

        self._name = name
        self._path = path
        self._body = body
        if type:
            self._type = type
        self._info = info

    @property
    def name(self) -> str:
        """Object name"""
        return self._name

    @property
    def path(self) -> str:
        """Path attribute"""
        return self._path

    @property
    def path_name(self) -> str:
        """Convenience method to generate path/name for store"""
        if not self._type:
            pathname = self._path + "/" + self._name
        else:
            pathname = self._path + "/" + self._name + "/" + self._type
        return pathname

    @property
    def body(self) -> str:
        """Content to persist, typically JSON"""
        return self._body

    @property
    def info(self) -> str:
        """Object metadata"""
        return self._info

    @property
    def data(self) -> {}:
        return self._data

    def md5(self) -> str:  # noqa F811
        return hashlib.md5(json.dumps(self._data, sort_keys=True).encode('utf-8')).hexdigest()

    @staticmethod
    def md5(obj: {}) -> str: # noqa F811
        return hashlib.md5(json.dumps(obj, sort_keys=True).encode('utf-8')).hexdigest()

    @property
    def type(self) -> str:
        if hasattr(self, "_type"):
            return self._type
        else:
            return None

    @type.setter
    def type(self, value) -> None:
        self._type = value

    @property
    def version(self) -> int:
        """Object version"""
        return self._version

    @name.setter
    def name(self, value: str) -> None:
        self._name = value

    @path.setter
    def path(self, value: str) -> None:
        self._path = value

    @body.setter
    def body(self, value: str) -> None:
        self._body = value

    @info.setter
    def info(self, value: str) -> None:
        self._info = value

    @type.setter
    def type(self, value: str) -> None:
        self._type = value

    @version.setter
    def version(self, value: int) -> None:
        self._version = value
