## NodeJS Example Scripts with Javascript
This is a collection of Node.js scripts that can be used to interact with the Whetstone API. 
In order to use these scripts you must have Node installed on your machine. 

You can verify if you have node installed by running `node -v` in a terminal window. You should see a 
version of node installed e.g., `v14.16.1`.
   - You can install the latest LTS version of Node from their official website. At the moment we recommend [NodeJS 14 LTS](https://www.nodejs.org/) but any version should work!

Once you have node installed, next you must update the `config.js` file with your Whetstone Client 
Credentials. Once the config file has been updated, you can execute the example scripts by running:
```shell
node users.js
```
Where `users.js` is the name of the script file you wish to run.

### Configuration
In order to execute the sample scripts you must:
   - Update the `config.js` file with your `client id` and `client
secret`.
   - The default URL for the scripts to use is `https://api.whetstoneeducation.com/v1/` which is the
production Whetstone API.
   - If you want to run against a different environment for testing purposes, like QA, you can modify
this URL to point to that environment e.g., `https://api-qa.whetstoneeducation.com/v1/`. (Note that your client id and secret will be different in each environment)

