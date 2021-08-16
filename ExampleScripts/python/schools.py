#!/usr/bin/python

import requests
import pprint
from config import BASE_URL
from utils import authenticate

'''
This function will return all schools from your allowed districts in a paginated format.
'''
def getAllSchools(access_token):
    response = requests.get(
        BASE_URL + '/external/schools',
        headers={'Authorization': 'Bearer ' + access_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json['data']
    else:
        raise Exception('Failed to get all schools')

'''
This function will return a specific school by its ID.
'''
def getSchoolById(access_token, school_id):
    response = requests.get(
        BASE_URL + '/external/schools/' + school_id,
        headers={'Authorization': 'Bearer ' + access_token}
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to get school by ID')

'''
Update a School's fields by its ID.

There are some specific rules here. Please view the docs for up to date information:
http://docs.whetstoneeducation.com/#api-Schools-UpdateSchool
'''
def updateSchoolById(access_token, school_id, fields_to_update):
    response = requests.put(
        BASE_URL + '/external/schools/' + school_id,
        headers={'Authorization': 'Bearer ' + access_token},
        json=fields_to_update
    )
    if response.status_code == 200:
        response_json = response.json()
        return response_json
    else:
        raise Exception('Failed to update school by ID')

# Authenticate
token = authenticate()

# Get All Schools
schools = getAllSchools(token)
pprint.pprint(schools)

# Get School By ID
school_id = '59401f146353df000c415340'
school = getSchoolById(token, school_id)
pprint.pprint(school)

# Update School By ID
# There are some specific rules here. Please view the docs for up to date information:
# http://docs.whetstoneeducation.com/#api-Schools-UpdateSchool
fields_to_update = {
    'district': '5ba264d5cd5f35424ee05d54',
    'name': 'My Updated School External API',

    # WARNING: When updating OBSERVATION GROUPS--it will REPLACE the entire object in the database.
    # This means if you want to ADD 1--then you need to include all of the other ones that exist in the request.
    # If you do NOT do this--it will add only the ones you send and delete the rest.

    'observationGroups': [
        {
            '_id': '5d717a856140150012191e16',
            'name': 'Teachers',
            'observees': [
                '5a7c8bed98a23600136c8db8'
            ]
        }
    ]
}
pprint.pprint(fields_to_update)
updatedSchool = updateSchoolById(token, school_id, fields_to_update)
pprint.pprint(updatedSchool)



