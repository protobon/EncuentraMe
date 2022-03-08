#!/usr/bin/python3
"""
Contains class pet
"""
import datetime
import uuid


class Pet():
    """ Creates pet"""

    def __init__(self):
        self.created_at = str(datetime.datetime.now())
        self.updated_at = str(datetime.datetime.now())
        self.id = uuid.uuid4
        self.titulo = ""
        self.comment = ""
        self.post__status = ""
        self.fbpost_link = ""
        self.fbpost_id = ""
        self.animal_type =""