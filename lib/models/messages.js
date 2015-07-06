module.exports = require('webrtc-core').bdsft.Model(Messages, {
  config: require('../../js/config.js')
})

var utils = require('webrtc-core').utils;

function Messages(eventbus, urlconfig, sipstack) {
  var self = {};

  self.props = ['messageAlert', 'messageWarning', 'messageSuccess', 'messageNormal', 'hasMessageAlert', 'hasMessageWarning', 'hasMessageSuccess', 'hasMessageNormal', 'classes'];

  self.updateMessageFailed = function(cause){
    self.messageFailed = require('../../js/config.js').messageFailed.replace('{0}', cause);
  };

  self.updateHasMessage = function(value, name){
    self[utils.camelize('has '+name)] = !!value;
  };

  self.bindings = {
    classes: {
        urlconfig: 'view',
        sipstack: ['registering', 'unregistering', 'connected', 'connecting', 'registered', 'registrationStatus', 'failed', 'userMediaFailed'],
        messages: ['hasMessageAlert', 'hasMessageWarning', 'hasMessageSuccess', 'hasMessageNormal', 'enableMessages']
    },
    enableMessages: {
      urlconfig: 'enableMessages'
    },
    messageFailed: {
      sipstack: 'failedCause'
    },
    hasMessage: {
      messages: ['messageAlert', 'messageWarning', 'messageSuccess', 'messageNormal']
    }
  }

  var showMessage = function(level, text){
    self['message'+level] = ((self['message'+level] || '') +  ' ' + text).trim();
  }
  self.alert = function(text){
    showMessage('Alert', text);
  };
  self.normal = function(text){
    showMessage('Normal', text);
  };
  self.success = function(text){
    showMessage('Success', text);
  };
  self.warning = function(text){
    showMessage('Warning', text);
  };

  self.getRemoteUser = function(rtcSession) {
    return rtcSession && rtcSession.remote_identity && rtcSession.remote_identity.uri && (rtcSession.remote_identity.uri.user || rtcSession.remote_identity.uri.host);
  };

  self.showErrorPopup = function(error) {
    window.alert(error);
  };

  self.listeners = function(databinder, sipstackDatabinder) {
    sipstackDatabinder.onModelPropChange("failedCause", function(cause) {
      if (cause === "User Denied Media Access") {
        self.showErrorPopup("WebRTC was not able to access your microphone/camera!");
      }
    });
    eventbus.on("ended", function(e) {
      self.normal(self.messageEnded.replace('{0}', self.getRemoteUser(e.sender)));
    });
    eventbus.on("resumed", function(e) {
      self.success(self.messageResume.replace('{0}', self.getRemoteUser(e.sender)));
    });
    eventbus.on("started", function(e) {
      if (e.data && !e.data.isReconnect) {
        self.success(self.messageStarted.replace('{0}', self.getRemoteUser(e.sender)));
      }
    });
    eventbus.on("held", function(e) {
      self.success(self.messageHold.replace('{0}', self.getRemoteUser(e.sender)));
    });
    eventbus.on("progress", function(e) {
      self.normal(self.messageProgress.replace('{0}', self.getRemoteUser(e.sender)));
    });
    eventbus.on("calling", function(e) {
      self.normal(self.messageCall.replace('{0}', self.getRemoteUser(e.sender)));
    });
    eventbus.on("incomingCall", function(e) {
      self.success(self.messageIncomingCall.replace('{0}', self.getRemoteUser(e.sender)));
    });

  };

  return self;
}