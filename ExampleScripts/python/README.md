## Python Example Scripts

This is a collection of Python scripts that can be used to interact with the Whetstone API. In order to use
these scripts you must have Python installed on your machine. You can verify if you have Python installed by
running `python --version` in a terminal window. You should see the version of node installed e.g., `Python 3.7.7`. 
Once you have verified python is installed, run `pipenv install` from the python directory to install dependencies.
Finally, you must update the config file with your Whetstone client credentials. Once the config file is updated, 
you can execute the example scripts by running `python users.py` where `users.py` is the name of the script you want 
to run.

### Configuration

In order to execute the sample scripts you must update the `config.py` file with your `client id` and `client
secret`. The default URL for the scripts to use is `https://api.whetstoneeducation.com/v1/` which is the
production Whetstone API. If you want to run against a different environment, like QA, you can modify
this URL to point to that environment e.g., `https://api-qa.whetstoneeducation.com/v1/`. 

