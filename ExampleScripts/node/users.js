#!/usr/bin/env node

// For more info on USERS from our API and additional parameters and options that are available,
// please refer to our official Documentation: http://docs.whetstoneeducation.com/#api-Users

// Import all of the helper functions that we need.
const { http, getAuthHeader, authenticate } = require('./utils');

/**
 * This function will return all users from your allowed districts in a paginated format.
 * @param accessToken The accessToken will authorize you to communicate with our API.
 */
const getAllUsers = async (accessToken) => {
  const endpoint = `external/users`;
  const res = await http.get(endpoint, getAuthHeader(accessToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

/**
 * This function will return a specific user by ID that you have access to.
 * @param accessToken The accessToken will authorize you to communicate with our API.
 * @param userId The ID of the user you want to GET.
 */
const getUserById = async (accessToken, userId) => {
  const endpoint = `external/users/${userId}`;
  const res = await http.get(endpoint, getAuthHeader(accessToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

/**
 * This function will update a specific user by ID that you have access to.
 * @param accessToken The accessToken will authorize you to communicate with our API.
 * @param userId The ID of the user you want to GET.
 * @param fieldsToUpdate A JSON object representing the fields you want to update on the user.
 */
const updateUserById = async (accessToken, userId, fieldsToUpdate) => {
  const endpoint = `external/users/${userId}`;
  const res = await http.put(endpoint, fieldsToUpdate, getAuthHeader(accessToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

/**
 * This is where we actually run all of our scripts above for testing purposes.
 */
(async () => {
  try {
    // You must first always run the authenticate method to obtain an access token.
    // The Access Token will last for 24 hours--so you can store it and use it multiple times!
    const authToken = await authenticate();
    if (authToken) {

      // Get All Users
      const users = await getAllUsers(authToken);
      console.log(JSON.stringify(users, null, 4));

      // Get User By ID
      const user = await getUserById(authToken, "60f88af74971e3001080affd");
      console.log(JSON.stringify(user, null, 4));

      // Update User By ID
      const updatedUser = await updateUserById(authToken, "60f88af74971e3001080affd", {
        name: "Diana Varinska"
      })
      console.log(JSON.stringify(updatedUser, null, 4));
    }
  } catch (err) {
    // Catch and display an errors to the console window.
    console.error(err);
  }
})();
