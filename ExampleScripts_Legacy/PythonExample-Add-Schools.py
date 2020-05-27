#!/usr/bin/python

import requests
import json

# Enter user credentials here
apikey=""; # YOUR API KEY GOES HERE 
url=""; # CHANGE INSTANCE TO YOUR URL
endpoint="/api/v2/schools"

# first send your API key via form POST to the authorization endpoint
authurl = url+'/auth/api';
payload = { "apikey" : apikey }
headers = {}

#make request
res = requests.post(authurl, data=payload, headers=headers)
print(res)
# decode the response
response = json.loads(res.text);

# get your token from the response
token = response["token"];

# if we have a token, proceed with API query
if token:
  # we will get a list of schools and print their names
  endpointurl = url+endpoint; #our endpoint URL

  #data to be added
  payload     = {
    "schools":[
      {"name":"Example School 1","internalId":"1"},
      {"name":"Example School 2","internalId":"2"}
    ]
  }
  
  headers     = {
    'content-type': 'application/json',
    'x-access-token': token,
    'x-key':apikey
  }  #headers include the content type, access token, and key

  print(json.dumps(payload))
  # make request
  res = requests.post(endpointurl, data=json.dumps(payload), headers=headers)

  # decode response
  response = json.loads(res.text);

  # pretty print response
  print(json.dumps(response, indent=2, sort_keys=True))

