test = require('../node_modules/webrtc-sipstack/test/includes/common')(require('../node_modules/webrtc-core/test/includes/common'));
describe('messages', function() {

  before(function(){
    test.createCore('urlconfig');
    test.createModelAndView('sipstack', {
      sipstack: require('webrtc-sipstack')
    });
    test.createModelAndView('messages', {
      messages: require('../'),
      sipstack: require('webrtc-sipstack')
    });
  });

  it('on unregistering', function() {
    sipstack.connecting = false;
    sipstack.registering = false;
    sipstack.unregistering = true;
    expect(messages.classes).toEqual(['unregistering', 'enableMessages']);
    expect(messagesview.messageUnregistering.css('display')).toEqual('block');
    expect(messagesview.messageRegistering.css('display')).toEqual('none');
    sipstack.unregistering = false;
  });
  it('on registrationStatus = 404', function() {
    sipstack.registrationStatus = '404';
    expect(messagesview.messageRegistrationNotFound.css('display')).toEqual('block');
    expect(messagesview.messageRegistrationWrongPassword.css('display')).toEqual('none');
    sipstack.registrationStatus = undefined;
  });
  it('on disconnect', function() {
    test.disconnect();
    expect(messagesview.messageConnectionFailed.css('display')).toEqual('block');
  });
  it('on userMediaFailed', function() {
    sipstack.userMediaFailed = true;
    expect(messagesview.messageGetUserMedia.css('display')).toEqual('block');
    sipstack.userMediaFailed = false;
  });
  it('on failed with USER_DENIED_MEDIA_ACCESS', function() {
    var alertCalled = false;
    messages.showErrorPopup = function() {
      alertCalled = true;
    }
    sipstack.failed = true;
    sipstack.failedCause = 'User Denied Media Access';
    expect(alertCalled).toEqual(true);
    sipstack.failed = undefined;
    sipstack.failedCause = undefined;
  });
  it('alert()', function() {
    messages.alert('Alert Test')
    expect(messagesview.messageAlert.css('display')).toEqual('block');
    expect(messagesview.messageAlert.text()).toEqual('Alert Test');
    messagesview.messageAlert.trigger('webkitAnimationEnd')
    expect(messagesview.messageAlert.text()).toEqual('');
    expect(messagesview.messageAlert.css('display')).toEqual('none');
  });
  it('on failed', function() {
    sipstack.failed = true;
    sipstack.failedCause = 'Internal Error';
    expect(messagesview.messageFailed.css('display')).toEqual('block');
    expect(messagesview.messageFailed.text()).toEqual('Call Failed : Internal Error');
    sipstack.failed = undefined;
    sipstack.failedCause = undefined;
  });
  it('on audioOnly', function() {
    urlconfig.view = 'audioOnly';
    expect(messages.classes).toEqual(["audioOnly","enableMessages"]);
  });
  // it('on disconnect for 503 with retryAfter', function() {
  //   test.disconnect({
  //     code: 503,
  //     reason: 'Service Unavailable',
  //     retryAfter: 30
  //   });
  //   expect(messagesview.alert.text().trim()).toEqual('Connection failed');
  // });
});
