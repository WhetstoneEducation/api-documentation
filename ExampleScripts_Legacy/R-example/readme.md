This is an example of how to access the Whetstone API in R.

The functions to access the API are contained in "whet_api.r". An example of how to use the result of the API to make a graph is contained in "analysis.r".

Note that in order to access the Whetstone API, you must authenticate.

- After logging into Whetstone, click your name at the top right and choose "My Settings". You should see a section called "Developer Options". (If you don't, get in touch. You may not have the correct permissions set up.)
- By default, your API key is hidden. Click, "Show my API key" to reveal an alphanumeric hash key. You can also generate a new API key by clicking "Generate New API Key." That invalidates the old key and creates a new one.
- Store your API key in an environment variable by creating a text file in your home directory called ".Renviron".
- In that file, include the line, "WHETSTONE_PAT=token" where "token" is replaced with the API key that you find on Whetstone.
- Be sure the file also ends with an empty line.