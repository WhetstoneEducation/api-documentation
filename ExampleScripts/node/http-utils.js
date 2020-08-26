const axios = require('axios');

class HttpUtils {

  static request(method, url, body = null, headers = null) {

    let defaultHeaders = {
      'Content-Type': 'application/json',
      'accept': 'json'
    }
    if (body) {
      defaultHeaders = Object.assign(defaultHeaders, {'Content-Length': Buffer.byteLength(JSON.stringify(body))});
    }
    if (headers) {
      defaultHeaders = Object.assign(defaultHeaders, headers);
    }
    const requestConfig = {
      method: method,
      url: url,
      ...(body) &&  { data: body },
      headers: defaultHeaders
    };

    return axios(requestConfig)
  }

  static async authorize(clientId, clientSecret, baseUrl) {
    if (!clientId || !clientSecret) {
      throw new Error('Authorization Failed: Please verify you have the correct client ID and secret');
    }
    const headers = {
      Authorization: HttpUtils.encodeCredentials(clientId, clientSecret)
    }
    const res = await HttpUtils.request('post', `${baseUrl}/auth/client/token`, null, headers)
    if (res && res.data && res.data.access_token) {
      return res.data.access_token
    } else {
      throw new Error('Authorization Failed: Please verify your CLIENT_ID and CLIENT_SECRET are valid');
    }
  }

  static getHeader(authToken, district) {
    return {
      ...(authToken) && this.getAuthHeader(authToken),
      ...(district) && this.getDistrictHeader(district),
    }
  }

  static getAuthHeader(authToken) {
    return {
      Authorization: `Bearer ${authToken}`
    };
  }

  static getDistrictHeader(district) {
    return {
      district
    };
  }

  static encodeCredentials(clientId, clientSecret) {
    return `Basic ${Buffer.from(clientId + ':' + clientSecret).toString('base64')}`
  }

  static get(url, headers) {
    return HttpUtils.request('get', url, null, headers);
  }

  static post(url, body, headers) {
    return HttpUtils.request('post', url, body, headers);
  }

  static put(url, body, headers) {
    return HttpUtils.request('put', url, body, headers);
  }
}

module.exports = HttpUtils;
