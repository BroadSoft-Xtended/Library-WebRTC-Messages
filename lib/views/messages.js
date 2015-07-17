module.exports = require('webrtc-core').bdsft.View(MessagesView, {
  template: require('../../js/templates'), 
  style: require('../../js/styles'),
  constants: require('../constants')
})

var utils = require('webrtc-core').utils;

function MessagesView(messages) {
  var self = {};

  self.model = messages;
  
  self.elements = ['messageAlert', 'messageSuccess', 'messageWarning', 'messageNormal', 'messageRegistering', 'messageRegistered', 'messageUnregistered', 
  'messageConnectionFailed', 'messageConnected', 'messageConnecting', 'messageUnregistering', 'messageRegistrationNotFound', 
  'messageRegistrationWrongPassword', 'messageFailed', 'messageGetUserMedia'];

  self.listeners = function(){
  	var onAnimationEnd = function(e){
  		$(e.target).text('');
  		$(e.target).trigger('change');
  	};
  	self.messageAlert.on('webkitAnimationEnd', onAnimationEnd);
  	self.messageSuccess.on('webkitAnimationEnd', onAnimationEnd);
  	self.messageWarning.on('webkitAnimationEnd', onAnimationEnd);
  	self.messageNormal.on('webkitAnimationEnd', onAnimationEnd);
  };
  return self;
}