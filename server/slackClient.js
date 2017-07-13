const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

let rtm = null;

// it is return new Real Time slack client
function initSlack (token, logLevel) {
  rtm = new RtmClient(token, logLevel);
  addAuthenticatedHandle(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
  return rtm;
};


function handleOnMessage(message){
    if(message.text === 'Mazila') return rtm.sendMessage('Lox!', message.channel)
    if(message.text === 'Погода') return rtm.sendMessage('Неибу!', message.channel)
    // rtm.sendMessage('Hello!', message.channel)

}

function handleOnAuthenticated(rtmStartData) {
  console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

function addAuthenticatedHandle(rtm, handle) {
  rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handle);
  
}

module.exports = {
  initSlack,
  addAuthenticatedHandle
}