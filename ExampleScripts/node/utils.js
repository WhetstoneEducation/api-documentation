const https = require('https');
const config = require('./config');
const BASE_URL = config.BASE_URL;

const request = (method, url, body = null, headers = null) => {
  if (!['get', 'post', 'put', 'delete'].includes(method)) {
    throw new Error(`Invalid method: ${method}`);
  }

  let urlObject;
  try {
    const fullUrl = `${BASE_URL}${url}`;
    urlObject = new URL(fullUrl);
  } catch (error) {
    throw new Error(`Invalid url ${url}`);
  }

  let options = {
    method: method.toUpperCase(),
    hostname: urlObject.hostname,
    port: urlObject.port,
    path: urlObject.pathname,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'json'
    }
  };

  if (body) {
    body = JSON.stringify(body);
    options.headers = Object.assign(options.headers, {'Content-Length': Buffer.byteLength(body)});
  }
  if (headers) {
    options.headers = Object.assign(options.headers, headers);
  }

  return new Promise((resolve, reject) => {

    const clientRequest = https.request(options, incomingMessage => {

      // Response object.
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
          }
        }

        resolve(response);
      });
    });

    // Reject on request error.
    clientRequest.on('error', error => {
      reject(error);
    });

    // Write request body if present.
    if (body) {
      clientRequest.write(body);
    }

    // Close HTTP connection.
    clientRequest.end();
  });
}

const authorize = async () => {
  const clientId = config.CLIENT_ID;
  const clientSecret = config.CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Authorization Failed: Please verify you have CLIENT_ID and CLIENT_SECRET set in the config file');
  }
  const headers = {
    Authorization: encodeCredentials(clientId, clientSecret)
  }
  const res = await request('post', `auth/client/token`, null, headers)
  if (res && res.body && res.body.access_token) {
    return res.body.access_token
  } else {
    throw new Error('Authorization Failed: Please verify your CLIENT_ID and CLIENT_SECRET are valid');
  }
}

const encodeCredentials = (clientId, clientSecret) => {
  return `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`
}

exports.http = {
  get: (url, headers) => {
    return request('get', url, null, headers);
  },
  post: (url, body, headers) => {
    return request('post', url, body, headers);
  },
  put: (url, body, headers) => {
    return request('put', url, body, headers);
  }
};

exports.authorize = authorize;

exports.getAuthHeader = (authToken) => {
  return {
    Authorization: `Bearer ${authToken}`
  };
}
