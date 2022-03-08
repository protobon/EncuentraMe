#!/usr/bin/python3
"""
Contains class User
"""

import uuid


class User():
    """ Define class User"""

    def __init__(self):
        self.username = ""
        self.id = uuid.uuid4
        self.phone = ""
        self.email = ""
        self.lost_pet = []
        self.found_pet = []