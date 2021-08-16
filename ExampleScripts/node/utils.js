// Note that our API always requires an HTTPS connection.
const https = require('https');
// Get a reference to our configuration object.
const config = require('./config');

/**
 * A generic method for making an HTTP Request using built in Node Functionality.
 *
 * If you want a more streamlined method and can use external dependencies, check out
 * the Axios Library here: https://www.npmjs.com/package/axios. By using AXIOS, you can
 * achieve the same results with a lot less code.
 *
 * @param method The type of request you want to make. Possible options are: [get, post, put, delete].
 * @param url The relative URL to the resource we want to access. This will get appended to the BASE_URL.
 * @param body Any optional or required body data we need to pass to the API.
 * @param headers Any optional or required header information we need to pass to the API.
 */
const request = (method, url, body = null, headers = null) => {
  // Just a safety check for method types we allow.
  if (!['get', 'post', 'put', 'delete'].includes(method)) {
    throw new Error(`Invalid Method: [${method}]`);
  }

  // Build the URL object for the request.
  let urlObject;
  try {
    const fullUrl = `${config.BASE_URL}${url}`;
    urlObject = new URL(fullUrl);
  } catch (error) {
    throw new Error(`Invalid Url: [${url}]`);
  }

  // The options object allows us to define default headers and other
  // various things the request object will need.
  let options = {
    method: method.toUpperCase(),
    hostname: urlObject.hostname,
    port: urlObject.port,
    path: urlObject.pathname,
    headers: {
      'Content-Type': 'application/json', // This should ALWAYS be: application/json
      'accept': 'json'
    }
  };

  // If we passed in a BODY--then add Content-Length to the request headers.
  if (body) {
    body = JSON.stringify(body);
    options.headers = Object.assign(options.headers, {'Content-Length': Buffer.byteLength(body)});
  }

  // If we passed in additional headers, add them to the options.
  if (headers) {
    options.headers = Object.assign(options.headers, headers);
  }

  // This is where we actually make the API call and return a promise.
  return new Promise((resolve, reject) => {

    const clientRequest = https.request(options, incomingMessage => {

      // This is the response object that we will update with data as it is received from the API.
      let response = {
        statusCode: incomingMessage.statusCode,
        headers: incomingMessage.headers,
        body: []
      };

      // Collect response body data.
      incomingMessage.on('data', chunk => {
        response.body.push(chunk);
      });

      // Resolve on end.
      incomingMessage.on('end', () => {
        if (response.body.length) {
          response.body = response.body.join();
          try {
            response.body = JSON.parse(response.body);
          } catch (error) {
            // Silently fail if response is not JSON.
            // Sometimes a response may not return JSON--but is still valid.
          }
        }
        resolve(response);
      });
    });

    // Reject on request error.
    clientRequest.on('error', error => {
      reject(error);
    });

    // If we intend to send data with our request--make sure to write it now.
    if (body) {
      clientRequest.write(body);
    }

    // Close the HTTP connection.
    clientRequest.end();
  });
}

/**
 * Attempt to authenticate with the Whetstone API by using the included Credentials in your config file.
 */
const authenticate = async () => {
  const clientId = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;
  if (!clientId || !clientSecret || clientId === 'YOUR_ID_HERE' || clientSecret === 'YOUR_SECRET_HERE') {
    throw new Error('Authentication Error: Please verify you have CLIENT_ID and CLIENT_SECRET set in the config file');
  }

  // Set our custom headers appropriately for encoding our credentials.
  const headers = {
    Authorization: encodeCredentials(clientId, clientSecret)
  }

  // Attempt to make the request to obtain your access token from Whetstone API.
  const res = await request('post', `auth/client/token`, null, headers)
  if (res && res.body && res.body.access_token) {
    return res.body.access_token
  } else {
    throw new Error('Authentication Failed: Please verify your CLIENT_ID and CLIENT_SECRET are valid!');
  }
}

/**
 * Given the credentials in your config file--we will encode them in the specified format.
 * The Whetstone API follows the Basic OAuth2.0 Spec and passes the Client and Secret encoded in Base64, separated with a semi-colon.
 * @param clientId The client ID that is in your config file.
 * @param clientSecret The client secret that is in your config file.
 */
const encodeCredentials = (clientId, clientSecret) => {
  return `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`;
}

/**
 * Export all of the code that we need from this module so we can re-use it elsewhere.
 */
module.exports = {
  authenticate: authenticate,
  getAuthHeader: (accessToken) => {
    return {
      Authorization: `Bearer ${accessToken}`
    };
  },
  http: {
    get: (url, headers) => {
      return request('get', url, null, headers);
    },
    post: (url, body, headers) => {
      return request('post', url, body, headers);
    },
    put: (url, body, headers) => {
      return request('put', url, body, headers);
    }
  }
};
