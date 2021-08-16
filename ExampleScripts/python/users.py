#!/usr/bin/python

import requests
import pprint
from config import BASE_URL
from utils import authenticate

'''
This function will return all users from your allowed districts in a paginated format.
'''
def getAllUsers(access_token):
    response = requests.get(
        BASE_URL + '/external/users',
        headers={'Authorization': 'Bearer ' + access_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json['data']
    else:
        raise Exception('Failed to get all users')

'''
This function will return a specific user by ID that you have access to.
'''
def getUserById(access_token, get_user_id):
    response = requests.get(
        BASE_URL + '/external/users/' + get_user_id,
        headers={'Authorization': 'Bearer ' + access_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to get user')

'''
This function will update a specific user by ID that you have access to.
'''
def updateUserById(access_token, update_user_id, fields_to_update):
    response = requests.put(
        BASE_URL + '/external/users/' + update_user_id,
        headers={'Authorization': 'Bearer ' + access_token},
        json=fields_to_update
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to update user')

try:
    # Get auth token to make authorized calls
    token = authenticate()

    # Get all users
    users = getAllUsers(token)
    pprint.pprint(users)

    # Get a single user by ID
    user_id = '5c62f5585a0a4300178eb310'
    user = getUserById(token, user_id)

    #  Update a single user by ID
    user_update_fields = {'name': '1st Grade Teacher'}
    updated_user = updateUserById(token, user_id, user_update_fields)
    pprint.pprint(updated_user)
except Exception as e:
    print("Error: {0}".format(e))

