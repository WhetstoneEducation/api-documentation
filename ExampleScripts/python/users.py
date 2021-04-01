#!/usr/bin/python

import requests
import pprint
from config import BASE_URL
from utils import authorize

def getAllUsers(auth_token):
    response = requests.get(
        BASE_URL + '/external/users',
        headers={'Authorization': 'Bearer ' + auth_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json['data']
    else:
        raise Exception('Failed to get all users')


def getUser(auth_token, get_user_id):
    response = requests.get(
        BASE_URL + '/external/users/' + get_user_id,
        headers={'Authorization': 'Bearer ' + auth_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to get user')


def updateUser(auth_token, update_user_id, fields_to_update):
    response = requests.put(
        BASE_URL + '/external/users/' + update_user_id,
        headers={'Authorization': 'Bearer ' + auth_token},
        data=fields_to_update
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to update user')

try:
    # Get auth token to make authorized calls
    token = authorize()

    # Get all users
    users = getAllUsers(token)
    pprint.pprint(users)

    # Get a single user by ID
    user_id = '5c62f5585a0a4300178eb310'
    user = getUser(token, user_id)

    #  Update a single user by ID
    user_update_fields = {'name': '1st Grade Teacher'}
    updated_user = updateUser(token, user_id, user_update_fields)
    pprint.pprint(updated_user)
except Exception as e:
    print("Error: {0}".format(e))

