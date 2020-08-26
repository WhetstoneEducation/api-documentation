#!/usr/bin/env node
const HttpUtils = require('./http-utils');
const { BASE_URL, CLIENT_ID, CLIENT_SECRET } = require('./config');
const http = HttpUtils;

const getAllSchools = async (authToken) => {
  const endpoint = `${BASE_URL}/external/schools`;
  const res = await http.get(endpoint, http.getHeader(authToken));
  if (res && res.data) {
    return res.data;
  } else {
    return null;
  }
}

(async () => {
  try {
    const authToken = await HttpUtils.authorize(CLIENT_ID, CLIENT_SECRET, BASE_URL);
    if (authToken) {
      const schools = await getAllSchools(authToken);
      console.log(schools);
    }
  } catch (err) {
    console.error(err);
  }
})();
