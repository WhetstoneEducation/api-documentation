#!/usr/bin/env node
const {http, getAuthHeader, authorize} = require('./utils');

const getAllSchools = async (authToken) => {
  const endpoint = `/external/schools`;
  const res = await http.get(endpoint, getAuthHeader(authToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

(async () => {
  try {
    const authToken = await authorize();
    if (authToken) {
      const schools = await getAllSchools(authToken);
      console.log(schools);
    }
  } catch (err) {
    console.error(err);
  }
})();
