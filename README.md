# Messages

Displays messages for call events and states.

Model : bdsft_webrtc.default.messages
View : bdsft_webrtc.default.messagesview
Dependencies : [SIP Stack](https://github.com/BroadSoft-Xtended/Library-WebRTC-SIPStack)

## Elements
<a name="elements"></a>

Element                           |Type  |Description
----------------------------------|------|---------------------------------------------------------------------------------------
messageAlert                      |div   |Displays an alert message.
messageConnected                  |div   |Displays the messageConnected configuration.
messageConnecting                 |div   |Displays the messageConnecting configuration.
messageConnectionFailed           |div   |Displays the messageConnectionFailed configuration.
messageFailed                     |div   |Displays the messageFailed configuration replacing {0} with the cause of the failure.
messageNormal                     |div   |Displays an informational message.
messageRegistered                 |div   |Displays the messageRegistered configuration.
messageRegistering                |div   |Displays the messageRegistering configuration.
messageRegistrationNotFound       |div   |Displays the messageRegistrationNotFound configuration.
messageRegistrationWrongPassword  |div   |Displays the messageRegistrationWrongPassword configuration.
messageSuccess                    |div   |Displays a success message.
messageUnregistered               |div   |Displays the messageUnregistered configuration.
messageUnregistering              |div   |Displays the messageUnregistering configuration.
messageWarning                    |div   |Displays a warning message.

## Configuration
<a name="configuration"></a>

Property                          |Type     |Default                                    |Description
----------------------------------|---------|-------------------------------------------|------------------------------------------------------------------------------
enableMessages                    |boolean  |true                                       |True if message display is enabled.
messageCall                       |string   |Performing NAT Tests                       |Message when an outgoing call has been placed.
messageConnected                  |string   |Connected                                  |Message when the websocket connected to the WRS.
messageConnecting                 |string   |Connecting to WRS…                         |Message when the websocket is being connected to the WRS.
messageConnectionFailed           |string   |Connection failed                          |Message when the websocket could not connect to the WRS.
messageEnded                      |string   |Call Ended                                 |Message when a call has ended.
messageFailed                     |string   |Call Failed : {0}                          |Message when a call has failed. The {0} will be replace with the cause of the failure.
messageGetUserMedia               |string   |Unable to Access Camera and/or Microphone  |Message when the user's camera and/or video could not be accessed.
messageHold                       |string   |Call placed on hold                        |Message when a call has been placed on hold.
messageIncomingCall               |string   |Incoming Call                              |Message on an incoming call.
messageProgress                   |string   |Ringing                                    |Message when incoming call is waiting for answer.
messageRegistered                 |string   |Registration successful                    |Message when authentication was successful and the user is registered.
messageRegistering                |string   |Registering…                               |Message when currently registering.
messageRegistrationNotFound       |string   |Registration : Not Found                   |Message when the userid was wrong.
messageRegistrationWrongPassword  |string   |Registration : Wrong Password              |Message when the password was wrong.
messageResume                     |string   |Call removed from hold                     |Message when a call has been removed from hold.
messageStarted                    |string   |Call Started                               |Message when a call has started.
messageUnregistered               |string   |Unregistered                               |Message when the user was signed out and is not registered anymore.
messageUnregistering              |string   |Unregistering…                             |Message when currently unregistering

## Methods
<a name="methods"></a>

Method         |Parameters                |Description
---------------|--------------------------|-----------------------------------------------------
alert(text)    |text : string to display  |Displays an alert message with the text passed in.
normal(text)   |text : string to display  |Displays a normal message with the text passed in.
success(text)  |text : string to display  |Displays a success message with the text passed in.
warning(text)  |text : string to display  |Displays a warning message with the text passed in.