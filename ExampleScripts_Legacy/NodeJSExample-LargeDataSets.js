#!/usr/bin/env node

// install libraries with: 
// npm install request lodash moment async
// or globally with 
// npm install -g request lodash moment async

const request = require('request');
    , _ = require('lodash');
    , moment = require('moment')
    , async = require('async')
;

const apikey=""; // YOUR API KEY GOES HERE 
const url=""; // CHANGE INSTANCE TO YOUR URL
var endpoint="/api/v2/observations";

//initial request to authentication server
var options = {
  url: url+'/auth/api', 
  method: "post",
  form: {
    apikey: apikey
  }
}
//make the initial token request
request(options, function(err, res, body) {
  if (err) console.log(err);
  //parse the body into an object
  try {
    var response = JSON.parse(body);
  }
  catch(err) {
    console.error(err);
    console.log(body)
  }
  //get the token
  var token = response.token;

  if (token) {
    //create monthly date starts for current school year
    var dates = [];
    for (var i = 0; i < 12; i++) {
      dates.push(moment("2016-07-01").add(i, 'months').startOf('day'))
    }
    var observations = [];

    //loop through each month to pull records in batches
    async.eachSeries(dates, function(date, next) {
      var options = {
        url: url+endpoint,
        method: "get", 
        headers: {
          'x-access-token': token,
          'x-key':apikey,
          'format':'json'
        },
        qs: {
          observedAt: {
            $gte: date.toISOString(),
            $lte: date.add(1,'month').endOf('day').toISOString()
          }
        }
      }
      request(options, function(err, res, body) {
        //parse the data into an object
        try {
          var data = JSON.parse(body);
        }
        catch(err) {
          console.error("Unable to parse response.");
        }
        //add data to observations array
        observations.concat(data)
        next()
      })
    }, function(err) {
      //do something with data
      console.log(observations.length+' added to observations array')
    })
  }
})