module.exports = require('webrtc-core').bdsft.Model(Messages, {
  config: require('../../js/config.js')
})

function Messages(eventbus, urlconfig) {
  var self = {};

  self.props = ['text', 'level', 'classes'];

  self.bindings = {
    'classes': {
        urlconfig: 'view'
    }
  }

  // Display status messages
  self.message = function(text, level) { 
    if (!self.enableMessages) {
      return;
    }
    self.level = level;
    self.text = text;
  };

  self.getRemoteUser = function(rtcSession) {
    return rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host;
  };

  self.init = function() {
    self.enableMessages = urlconfig.enableMessages || self.enableMessages;
  };

  self.listeners = function() {
    eventbus.on("ended", function(e) {
      self.message(self.messageEnded.replace('{0}', self.getRemoteUser(e.sender)), "normal");
    });
    eventbus.on("resumed", function(e) {
      self.message(self.messageResume.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    eventbus.on("started", function(e) {
      if (e.data && !e.data.isReconnect) {
        self.message(self.messageStarted.replace('{0}', self.getRemoteUser(e.sender)), "success");
      }
    });
    eventbus.on("held", function(e) {
      self.message(self.messageHold.replace('{0}', self.getRemoteUser(e.sender)), "success");
    });
    eventbus.on("disconnected", function(e) {
      var msg = self.messageConnectionFailed;
      if (e.data && e.data.reason) {
        msg = e.data.reason;
      }
      if (e.data && e.data.retryAfter) {
        msg += " - Retrying in " + e.data.retryAfter + " seconds";
      }
      self.message(msg, "alert");
    });
    eventbus.on("failed", function(e) {
      var error = e.cause;
      self.message(error, "alert");
    });
    eventbus.on("progress", function(e) {
      self.message(self.messageProgress, "normal");
    });
    eventbus.on("message", function(e) {
      self.message(e.text, e.level);
    });
    eventbus.on("registrationFailed", function(e) {
      var statusCode = e.data.response.status_code;
      var msg = statusCode;
      if (statusCode === 403) {
        msg = "403 Authentication Failure";
      }
      self.message(self.messageRegistrationFailed.replace('{0}', msg), "alert");
    });
    eventbus.on("registered", function(e) {
      self.message(self.messageRegistered, "success");
    });
    eventbus.on("unregistered", function(e) {
      self.message(self.messageUnregistered || 'Unregistered', "success");
    });
    eventbus.on("connected", function(e) {
      self.message(self.messageConnected, "success");
    });
    eventbus.on("getUserMediaFailed", function(e) {
      self.message(self.messageGetUserMedia, "alert");
    });
    eventbus.on("invalidDestination", function(e) {
      self.message(self.messageOutsideDomain, "alert");
    });
    eventbus.on("emptyDestination", function(e) {
      self.message(self.messageEmptyDestination, "alert");
    });
    eventbus.on("calling", function(e) {
      self.message(self.messageCall, "success");
    });

  };

  return self;
}