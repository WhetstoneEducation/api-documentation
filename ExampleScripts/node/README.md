## Node.js Example Scripts

This is a collection of Node.js scripts that can be used to interact with the Whetstone API. In order to use
these scripts you must have Node installed on your machine. You can verify if you have node installed by
running `node -v` in a terminal window. You should see the version of node installed e.g., `v12.13.0`. If
you have node installed, next you must update the config file with your Whetstone client credentials. Once
the config file is updated, you can execute the example scripts by running `node users.js` where `users.js`
is the name of the script you want to run.

### Configuration

In order to execute the sample scripts you must update the `config.js` file with your `client id` and `client
secret`. The default URL for the scripts to use is `https://api.whetstoneeducation.com/v1/` which is the
production Whetstone API. If you want to run against a different environment, like QA, you can modify
this URL to point to that environment e.g., `https://api-qa.whetstoneeducation.com/v1/`. 

