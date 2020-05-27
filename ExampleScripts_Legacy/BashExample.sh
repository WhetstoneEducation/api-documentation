#!/bin/bash

# Enter user credentials here
apikey=""; # YOUR API KEY GOES HERE 
url="http://instance.whetstoneeducation.com"; # CHANGE INSTANCE TO YOUR URL
endpoint="/api/v2/schools"

function jsonval {
  # function to parse json string and get a variable 
  temp=`echo $json | sed 's/\\\\\//\//g' | sed 's/[{}]//g' | awk -v k="text" '{n=split($0,a,","); for (i=1; i<=n; i++) print a[i]}' | sed 's/\"\:\"/\|/g' | sed 's/[\,]/ /g' | sed 's/\"//g' | grep -w $prop`
  echo ${temp##*|}
}
echo "Fetting token..."
echo
json=`curl -s --data "apikey=$apikey" $url/auth/api`
prop='token'
token=`jsonval`
echo "Fetching data..."
echo
#get some data from the server
echo "curl -H \"content-type:application/json\" -H \"x-access-token:$token\" -H \"x-key:$apikey\" $url$endpoint"
curl -H "content-type:application/json" -H "x-access-token:$token" -H "x-key:$apikey" $url$endpoint
