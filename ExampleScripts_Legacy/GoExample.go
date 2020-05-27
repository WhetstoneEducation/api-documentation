package main

import (
  "bytes"
  "fmt"
  "io/ioutil"
  "net/http"
  "encoding/json"
)

// NOTE: Go is (probably obviously) not a language I've used extensively. 
// This works but probably isn't very well written code

func main() {
  url := "https://instance.whetstoneeducation.com" //change "instance" to your instance name
  endpoint := "/api/v2/schools"; //endpoint we plan to consume
  apikey := ""; //add your API key here

  // the authorization server URL
  authurl := url+"/auth/api";

  // the URL for our request
  requrl := url+endpoint;

  // create the JSON string to send to the auth server
  var jsonStr = []byte(`{"apikey":"`+apikey+`"}`)

  // prepare new POST request to the auth URL with our API key
  req, err := http.NewRequest("POST", authurl, bytes.NewBuffer(jsonStr))
  req.Header.Set("Content-Type", "application/json")

  // make HTTP request and get response
  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }

  // get response body
  body, _ := ioutil.ReadAll(resp.Body)
  defer resp.Body.Close()

  // consume the JSON received in the response
  var jsonResponse map[string]interface{};
  err = json.Unmarshal([]byte(body), &jsonResponse);
  if (err != nil) {
    panic(err)
  }

  // get the token from the JSON response
  var token = jsonResponse["token"].(string)

  // now we're ready to make a GET HTTP Request to get some actual data
  
  // We could put query values in here like `{name: "Example School"}` but we'll just get all the schools
  jsonStr = []byte(`{}`)

  // Setup the GET HTTP Request with our token and api key in the headers
  req, err = http.NewRequest("GET", requrl, bytes.NewBuffer(jsonStr))
  req.Header.Set("x-access-token", token)
  req.Header.Set("x-key", apikey)
  req.Header.Set("Content-Type", "application/json")

  // make the request
  resp, err = client.Do(req)
  if err != nil {
    panic(err)
  }

  // read the HTTP response body
  body, _ = ioutil.ReadAll(resp.Body)
  defer resp.Body.Close();

  // this function just prints the response to the console
  doSomethingWithResponse(string(body));
}

func doSomethingWithResponse(string response) {
  //print response to console
  fmt.Println(response)
}
