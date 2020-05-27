#!/usr/bin/env node
var request = require('request');

var apikey=""; // YOUR API KEY GOES HERE 
var url="http://instance.whetstoneeducation.com"; // CHANGE INSTANCE TO YOUR URL
var endpoint="/api/v2/users";

//initial request to authentication server
var options = {
  url: url+'/auth/api', 
  method: "post",
  form: {
    apikey: apikey
  }
}
//make the request
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
    //request data
    var options = {
      url: url+endpoint,
      method: "post", 
      form: {
        users:[
          {
            "name":"Test User 1",
            "email":"test.user1@example.com",
          {
            "name":"Test User 2",
            "email":"test.user2@example.com"
          }
        ]
      },
      headers: {
        'x-access-token': token,
        'x-key':apikey,
        'format':'json'
      }
    }
    request(options, function(err, res, body) {

      //parse the data into an object
      try {
        var data = JSON.parse(body, null, 2);
      }
      catch(err) {
        console.log(body)
      }
      //output the data to the console
      console.log(data)
    })
  }
})