#!/usr/bin/python

import requests
import json

# Enter user credentials here
apikey=""; # YOUR API KEY GOES HERE 
url="http://instance.whetstoneeducation.com"; # CHANGE INSTANCE TO YOUR URL
endpoint="/api/v2/schools"

# first send your API key via form POST to the authorization endpoint
authurl = url+'/auth/api';
payload = { "apikey" : apikey }
headers = {}

#make request
res = requests.post(authurl, data=payload, headers=headers)

# decode the response
response = json.loads(res.text);

# get your token from the response
token = response["token"];

# if we have a token, proceed with API query
if token:
  # we will get a list of schools and print their names
  endpointurl = url+endpoint; #our endpoint URL
  payload     = {} #query data could go here, if applicable
  headers     = {
    'content-type': 'application/json',
    'x-access-token': token,
    'x-key':apikey
  }  #headers include the content type, access token, and key

  # make request
  res = requests.get(endpointurl, data=payload, headers=headers)

  # decode response
  response = json.loads(res.text);

  # loop through responses and print the name of the school
  for school in response:
    print(school['name'])

