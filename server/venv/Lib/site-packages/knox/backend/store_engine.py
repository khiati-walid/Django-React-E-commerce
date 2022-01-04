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
from .store_object import StoreObject


class StoreEngine:
    """The abstract persistence strategy for storing the certificates """
    settings: object

    def __init__(self) -> None:
        """Constructor for StoreEngine"""

    def open(self) -> bool:
        """Initialize access to the persistence"""
        pass

    def close(self) -> bool:
        """Close access to the persistence"""
        pass

    def initialize(self) -> bool:
        """Ensure the store is configured properly"""
        pass

    def read(self, path: str, name: str, type=None) -> StoreObject:
        """Read from the store"""
        pass

    def write(self, obj: StoreObject) -> bool:
        """Write to the store"""
        pass

    def delete(self, path: str, name: str) -> bool:
        """Delete from the store"""
        pass
