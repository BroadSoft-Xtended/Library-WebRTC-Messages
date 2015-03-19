var jsdom = require('mocha-jsdom');
expect = require('expect');
jsdom({});

describe('messages', function() {

  before(function(){
    core = require('webrtc-core');
    testUA = core.testUA;
    config = {enableMessages: true};
    testUA.createCore('configuration', config);
    testUA.createCore('sipstack', config);
    testUA.createModelAndView('messages', {messages: require('../')});
    testUA.mockWebRTC();
  });

  it('on disconnect', function() {
    testUA.disconnect();
    expect(messagesview.alert.text().trim()).toEqual('Connection failed');
  });
  it('on invalid destination and connected', function() {
    location.search = '?destination=12345';
    config.allowOutside = false;
    testUA.createCore('configuration', config);
    testUA.connect();
    expect(messagesview.success.text().trim()).toEqual('Connected');
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
