#!/usr/bin/env node
var request = require('request');

var apikey = ""; // YOUR API KEY GOES HERE
var url = "http://instance.whetstoneeducation.com"; // CHANGE TO YOUR URL
var endpoint="/api/v2/schools" // CHANGE THIS TO THE ENDPOINT YOU WANT TO ACCESS

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

  //parse the body into an object
  var response = JSON.parse(body);

  //get the token
  var token = response.token;

  if (token) {

    //request data
    var options = {
      url: url+endpoint,
      method: "get", 
      headers: {
        'x-access-token': token,
        'x-key':apikey
      }
    }
    request(options, function(err, res, body) {
      
      //parse the data into an object
      var data = JSON.parse(body);

      //output the data to the console
      console.log(data)
    })
  }
})