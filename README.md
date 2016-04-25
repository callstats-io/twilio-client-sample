## twilio client meets callstats.io

This is an example integration of the callstats.js (using a shim) hosted at: http://api.callstats.io/callstats-twilio.min.js

The following steps need to be performed by a twilio developer.

+ initialize
+ setCallParams: set call-id and remote-user-id.

--- 

## Welcome to the Python Guild!

As members of the Python guild, you will be working through the challenges of TwilioQuest using the Python programming language.  This project is pre-configured to do some interesting Twilio stuff using Python and the [Flask](http://flask.pocoo.org/) web framework.

### Setting Up

We assume that before you begin, you will have [Python](http://www.python.org/) and [pip](http://www.pip-installer.org/en/latest/) installed on your system and available at the command line.

Before you can run this project, you will need to set three system environment variables.  These are:

* `TWILIO_ACCOUNT_SID` : Your Twilio "account SID" - it's like your username for the Twilio API.  This and the auth token (below) can be found [on your account dashboard](https://www.twilio.com/user/account).
* `TWILIO_AUTH_TOKEN` : Your Twilio "auth token" - it's your password for the Twilio API.  This and the account SID (above) can be found [on your account dashboard](https://www.twilio.com/user/account).
* `TWILIO_NUMBER` : A Twilio number that you own, that can be used for making calls and sending messages.  You can find a list of phone numbers you control (and buy another one, if necessary) [in the account portal](https://www.twilio.com/user/account/phone-numbers/incoming).


### Running the application

Navigate to the folder with the source code on your machine in a terminal window.

You will first need to install the application's dependencies. To install them  manually, type the following commands in your terminal:

    pip install twilio
    pip install flask

Now, you should be able to launch the application.  From your terminal, run `python run.py`.  This should launch your sinatra application on port 5000 - (127.0.0.1:5000/client?client=tommy)).
