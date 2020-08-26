#!/usr/bin/env node
const HttpUtils = require('./http-utils');
const { BASE_URL, CLIENT_ID, CLIENT_SECRET } = require('./config');
const http = HttpUtils;

const getAllUsers = async (authToken) => {
  const endpoint = `${BASE_URL}/external/users`;
  const res = await http.get(endpoint, http.getHeader(authToken));
  if (res && res.data) {
    return res.data;
  } else {
    return null;
  }
}

const getUser = async (authToken, userId) => {
  const endpoint = `${BASE_URL}/external/users/${userId}`;
  const res = await http.get(endpoint, http.getHeader(authToken));
  if (res && res.data) {
    return res.data;
  } else {
    return null;
  }
}

const updateUser = async (authToken, userId, fieldsToUpdate) => {
  const endpoint = `${BASE_URL}/external/users/${userId}`;
  const res = await http.put(endpoint, fieldsToUpdate, http.getHeader(authToken));
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
      const userId = '5c62f5585a0a4300178eb310';
      const users = await getAllUsers(authToken);
      console.log(JSON.stringify(users, null, 4));
      const user = await getUser(authToken, userId);
      console.log(JSON.stringify(user, null, 4));
      const updatedUser = await updateUser(authToken, userId, {
        name: "1stGrade Teacher"
      })
      console.log(JSON.stringify(updatedUser, null, 4));
    }
  } catch (err) {
    console.error(err);
  }
})();
