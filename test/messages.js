var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('messages', function() {

  before(function(){
    core = require('webrtc-core');
    testUA = core.testUA;
    testUA.createCore('urlconfig');
    testUA.createCore('sipstack');
    testUA.createModelAndView('messages', {messages: require('../')});
    testUA.mockWebRTC();
  });

  it('on disconnect', function() {
    testUA.disconnect();
    expect(messagesview.alert.text().trim()).toEqual('Connection failed');
  });
  it('on audioOnly', function() {
    urlconfig.view = 'audioOnly';
    expect(messagesview.messages.attr('class')).toEqual('messages classes audioOnly');
  });
  it('on disconnect for 503 with retryAfter', function() {
    testUA.disconnect({
      code: 503,
      reason: 'Service Unavailable',
      retryAfter: 30
    });
    expect(messagesview.alert.text().trim()).toEqual('Service Unavailable - Retrying in 30 seconds');
  });
});
