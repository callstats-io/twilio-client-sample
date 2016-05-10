requirejs.config({
  paths: {
    twilio: "http://media.twiliocdn.com/sdk/js/client/v1.3/twilio",
    callstats: "https://api.callstats.io/static/callstats.min",
    'callstats-twilio-client': "https://api.callstats.io/static/callstats-twilio-client-shim.min",
    socketio: "https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.3.5/socket.io",
    sha: "https://cdnjs.cloudflare.com/ajax/libs/jsSHA/1.5.0/sha",
    jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min",

  },
  shim: {
    'socketio': {
      exports: 'io'
    },
    'sha': {
      exports: 'jsSHA'
    },
    'jquery': {
      exports: '$'
    },
    'twilio': {
      exports: 'twilio',
      deps: ['jquery']
    },
    'callstats': {
      exports: 'callstats',
      deps: ['jquery','socketio','sha']
    },
    'callstats-twilio-client': {
      exports: 'callstats-twilio-client',
      deps: ['callstats']
    }
  }
});

