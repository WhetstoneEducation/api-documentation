import requests
import base64
from config import CLIENT_ID, CLIENT_SECRET, BASE_URL

'''
Attempt to authenticate with the Whetstone API by using the included Credentials in your config file.
'''
def authenticate():
    client_id = CLIENT_ID
    client_secret = CLIENT_SECRET

    if client_id is None or client_secret is None or client_id == 'YOUR_ID_HERE' or client_secret == 'YOUR_SECRET_HERE':
        raise Exception(
            'Authentication Failed: Please verify you have CLIENT_ID and CLIENT_SECRET set in the config module.')

    encoded_credentials = encodeCredentials(client_id, client_secret)
    response = requests.post(
        BASE_URL + '/auth/client/token',
        headers={'Authorization': encoded_credentials},
    )

    if response.status_code == 200:
        response_json = response.json()
        return response_json['access_token']
    else:
        raise Exception(
            'Authentication Failed: Please verify your CLIENT_ID and CLIENT_SECRET are valid in the config module')


'''
Given the credentials in your config file--we will encode them in the specified format.
The Whetstone API follows the Basic OAuth2.0 Spec and passes the Client and Secret encoded in Base64, separated with a semi-colon.
'''
def encodeCredentials(client_id, client_secret):
    client_credential_string = client_id + ':' + client_secret
    encoded_credentials = base64.b64encode(client_credential_string.encode("utf-8"))
    encoded_credentials_string = str(encoded_credentials, "utf-8")
    return 'Basic ' + encoded_credentials_string
