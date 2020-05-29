#!/usr/bin/python

import requests
from config import BASE_URL
from utils import authorize

def getAllSchools(auth_token):
    response = requests.get(
        BASE_URL + '/external/schools',
        headers={'Authorization': 'Bearer ' + auth_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json['data']
    else:
        raise Exception('Failed to get all schools')

token = authorize()
schools = getAllSchools(token)
print(schools)
