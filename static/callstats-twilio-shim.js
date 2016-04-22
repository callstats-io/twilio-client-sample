function csInitCallback(err, msg) {
  console.log("CallStats Initializing Status: err=" + err + " msg=" + msg);
}

function csCallback(err, msg) {
  console.log("StatsRTC: remote-id ", " status: ", err, " msg: ", msg);
}

function CallstatsTwilioShim() {
  this.callStats = new callstats($, io, jsSHA);
  return this;
};

CallstatsTwilioShim.prototype.setLocalUserID = function setLocalUserID(localUserID) {
  this.localUserID = localUserID;
};

CallstatsTwilioShim.prototype.initialize = function initialize(appID, appSecret, conferenceID, localUserID) {
  this.callstatsAppID = appID;
  this.callstatsAppSecret = appSecret;
  this.conferenceID = conferenceID;
  this.localUserID = localUserID;

  this.callStats.initialize(appID, appSecret, localUserID, csInitCallback);
};

var params;

CallstatsTwilioShim.prototype.setRemoteUserID = function setRemoteUserID(remoteUserID) {
  this.remoteUserID = remoteUserID;
};

var CallstatsTwilio = new CallstatsTwilioShim();


Twilio.Device.ready(function(device) {
  console.log("Client is ready ", device);
});

Twilio.Device.error(function(error) {
  console.log("Error: ", error.message);
  //handleError(error); no Pc :(
});

Twilio.Device.connect(function(conn) {
  console.log("Successfully established call ", conn, CallstatsTwilio.remoteUserID);
  CallstatsTwilio.callStats.addNewFabric(conn.mediaStream.version.pc, CallstatsTwilio.remoteUserID, CallstatsTwilio.callStats.fabricUsage.multiplex, CallstatsTwilio.conferenceID, csCallback);
});

Twilio.Device.disconnect(function(conn) {
  console.log("Call ended ");
});

Twilio.Device.incoming(function(conn) {
  console.log("Incoming connection from ", conn);
});

var twilioErrorCodes = {
  createOfferAnswerErrorCode: 31000,
  getUserMediaErrorCode1: 31208,
  getUserMediaErrorCode2: 31201,
  iceFailureErrorCode: 31003
}

// We dont have pc in the error callback. So what to do in this situation????
function handleError(error) {
  if (error.code === twilioErrorCodes.createOfferAnswerErrorCode) {
    if (errorContains("offer", error.message)) {
      CallstatsTwilio.callStats.reportError(pc, CallstatsTwilio.conferenceID, CallstatsTwilio.callStats.webRTCFunctions.createOffer, error.message);
    } else if (errorContains("answer", error.message)) {
      CallstatsTwilio.callStats.reportError(pc, CallstatsTwilio.conferenceID, CallstatsTwilio.callStats.webRTCFunctions.createAnswer, error.message);
    } else {
      CallstatsTwilio.callStats.reportError(pc, CallstatsTwilio.conferenceID, CallstatsTwilio.callStats.webRTCFunctions.signalingError, error.message);
    }
  } else if (error.code === twilioErrorCodes.getUserMediaErrorCode1 || error.code === twilioErrorCodes.getUserMediaErrorCode2) {
    CallstatsTwilio.callStats.reportError(pc, CallstatsTwilio.conferenceID, CallstatsTwilio.callStats.webRTCFunctions.getUserMedia, error.message);
  } else if (error.code === twilioErrorCodes.iceFailureErrorCode) {
    CallstatsTwilio.callStats.reportError(pc, CallstatsTwilio.conferenceID, CallstatsTwilio.callStats.webRTCFunctions.iceConnectionFailure, error.message);
  }

}