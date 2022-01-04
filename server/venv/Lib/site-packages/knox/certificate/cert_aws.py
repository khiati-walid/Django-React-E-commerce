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

import re

from dynaconf import settings

from .cert import Cert


class AWSCert(Cert):
    """
    AWSCert Class
    """

    def __init__(self, common_name: str, arn: str = None):
        super().__init__(settings=settings, common_name=common_name)
        self._arn = arn

    @classmethod
    def ARNPATTERN(cls) -> re.Pattern:  # noqa: PEP8
        return re.compile("arn:aws:acm:\w+:\d+:certificate\/.*")  # noqa: PEP8 W605

    @property
    def arn(self) -> str:
        return self._arn

    @arn.setter
    def arn(self, value) -> None:
        if AWSCert.ARNPATTERN().match(value):
            self._arn = value
