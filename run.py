from flask import Flask, request, render_template
from twilio.util import TwilioCapability
import twilio.twiml

import re
import os

app = Flask(__name__)

# Add a phone number you've verified with Twilio as the caller ID
caller_id = "+12125551234"

# put your default Twilio Client name here, for when a phone number isn't given
default_client = "jenny"
__ACCOUNT_SID = os.getenv('ACCOUNT_SID', '')
__AUTH_TOKEN  = os.getenv('AUTH_TOKEN', '')
__APP_ID = os.getenv('APP_ID', '')
__APP_SECRET = os.getenv('APP_SECRET', '')

@app.route('/voice', methods=['GET', 'POST'])
def voice():
    dest_number = request.values.get('PhoneNumber', None)

    resp = twilio.twiml.Response()

    with resp.dial(callerId=caller_id) as r:
        # If we have a number, and it looks like a phone number:
        if dest_number and re.search('^[\d\(\)\- \+]+$', dest_number):
            r.number(dest_number)
        else:
            r.client(dest_number)

    return str(resp)

@app.route('/client', methods=['GET', 'POST'])
def client():
    """Respond to incoming requests."""

    client_name = request.values.get('client', None) or "jenny"

    # Find these values at twilio.com/user/account
    account_sid = __ACCOUNT_SID
    auth_token = __AUTH_TOKEN

    capability = TwilioCapability(account_sid, auth_token)

    application_sid = "APabe7650f654fc34655fc81ae71caa3ff" # Twilio Application Sid
    capability.allow_client_outgoing(application_sid)
    capability.allow_client_incoming(client_name)
    token = capability.generate()

    return render_template('client.html', token=token, appID=__APP_ID, appSecret=__APP_SECRET,
                           client_name=client_name)


@app.route('/reqclient', methods=['GET', 'POST'])
def reqclient():
    """Respond to incoming requests."""

    client_name = request.values.get('client', None) or "jenny"

    # Find these values at twilio.com/user/account
    account_sid = __ACCOUNT_SID
    auth_token = __AUTH_TOKEN

    capability = TwilioCapability(account_sid, auth_token)

    application_sid = "APabe7650f654fc34655fc81ae71caa3ff" # Twilio Application Sid
    capability.allow_client_outgoing(application_sid)
    capability.allow_client_incoming(client_name)
    token = capability.generate()

    return render_template('client.html', token=token, appID=__APP_ID, appSecret=__APP_SECRET,
                           client_name=client_name)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port='5000', debug=True)
