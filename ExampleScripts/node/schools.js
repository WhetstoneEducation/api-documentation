#!/usr/bin/env node

// For more info on USERS from our API and additional parameters and options that are available,
// please refer to our official Documentation: http://docs.whetstoneeducation.com/#api-Users

// Import all of the helper functions that we need.
const { http, getAuthHeader, authenticate } = require('./utils');

/**
 * This function will return all schools from your allowed districts in a paginated format.
 * @param accessToken The accessToken will authorize you to communicate with our API.
 */
const getAllSchools = async (accessToken) => {
  const endpoint = `/external/schools`;
  const res = await http.get(endpoint, getAuthHeader(accessToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

/**
 * This function will return a specific school by ID that you have access to.
 * @param accessToken The accessToken will authorize you to communicate with our API.
 * @param schoolId The ID of the school you want to GET.
 */
const getSchoolById = async (accessToken, schoolId) => {
  const endpoint = `external/schools/${schoolId}`;
  const res = await http.get(endpoint, getAuthHeader(accessToken));
  if (res && res.body) {
    return res.body;
  } else {
    return null;
  }
}

/**
 * Update a School's fields by its ID.
 * There are some specific rules here. Please view the docs for up to date information:
 * http://docs.whetstoneeducation.com/#api-Schools-UpdateSchool
 * @param accessToken The accessToken will authorize you to communicate with our API.
 * @param schoolId The ID of the school you want to GET.
 * @param fieldsToUpdate A JSON object representing the fields you want to update on the school.
 */
const updateSchoolById = async (accessToken, schoolId, fieldsToUpdate) => {
  const endpoint = `external/schools/${schoolId}`;
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

      // Get All Schools
      const schools = await getAllSchools(authToken);
      console.log(schools);

      // Get School By ID
      const school = await getSchoolById(authToken, "60c141a5f3c96200128a2098");
      console.log(school);

      // Update A School By ID
      // This is also an example of updating Observation Groups on Schools
      // There are specific rules surrounding how this works so please refer to the docs as well:
      // http://docs.whetstoneeducation.com/#api-Schools-UpdateSchool
      // In this example we are adding a User with a TEACHER role to the TEACHERS group as an observee.
      const fieldsToUpdate = {
        district: "5d24f84b0ad5dc0019f115e3", // Required
        name: "My Updated School External API",

      // WARNING: When updating OBSERVATION GROUPS--it will REPLACE the entire object in the database.
      // This means if you want to ADD 1--then you need to include all of the other ones that exist in the request.
      // If you do NOT do this--it will add only the ones you send and delete the rest.

        observationGroups: [
          {
            _id: "60fee7e5b6f902001002304b", // Group ID
            name: "Teachers", // Group Name
            observees: [
                "60f57cbeac1e5c001199bb3c" // UserID
            ]
          }
        ]
      };
      const updatedSchool = await updateSchoolById(authToken, "60fee7e5b6f902001002304a", fieldsToUpdate);
      console.log(updatedSchool);
    }
  } catch (err) {
    console.error(err);
  }
})();
