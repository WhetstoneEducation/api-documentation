## Python Example Scripts with Pipenv
This is a collection of Python scripts that can be used to interact with the Whetstone API.
In order to use these scripts you must have Python installed on your machine.

You can verify if you have node installed by running `python --version` in a terminal window. You should see a
version of node installed e.g., `v3.9.6`.
- You can install the latest version of Python from their official website. At the moment we recommend [Python 3](https://www.python.org/) but any version should work!
- To install Pipenv--please visit their [Official Website](https://pipenv.pypa.io/en/latest/install/) and follow the installation instructions.

Run the following command to install the dependencies you will need:
```shell
pipenv install
```

Once you have Python installed, next you must update the `config.py` file with your Whetstone Client
Credentials. Once the config file has been updated, you can execute the example scripts by running:
```shell
python users.py
```
Where `users.py` is the name of the script file you wish to run.

### Configuration
In order to execute the sample scripts you must:
- Update the `config.py` file with your `client id` and `client
  secret`.
- The default URL for the scripts to use is `https://api.whetstoneeducation.com/v1/` which is the
  production Whetstone API.
- If you want to run against a different environment for testing purposes, like QA, you can modify
  this URL to point to that environment e.g., `https://api-qa.whetstoneeducation.com/v1/`. (Note that your client id and secret will be different in each environment)
  
