#!/usr/bin/env node
const {http, getAuthHeader, authorize} = require('./utils');

const getAllUsers = async (authToken) => {
  const endpoint = `external/users`;
  const res = await http.get(endpoint, getAuthHeader(authToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

const getUser = async (authToken, userId) => {
  const endpoint = `external/users/${userId}`;
  const res = await http.get(endpoint, getAuthHeader(authToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

const updateUser = async (authToken, userId, fieldsToUpdate) => {
  const endpoint = `external/users/${userId}`;
  const res = await http.put(endpoint, fieldsToUpdate, getAuthHeader(authToken));
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
