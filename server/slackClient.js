const { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

let rtm = null;
let wit = null;

// it is return new Real Time slack client
function initSlack (token, logLevel, witClient) {
  rtm = new RtmClient(token, logLevel);
  wit = witClient;
  addAuthenticatedHandle(rtm, handleOnAuthenticated);
  rtm.on(RTM_EVENTS.MESSAGE, handleOnMessage);
  return rtm;
};


function handleOnMessage(message){
  if(message.text.toLowerCase() === 'help') return require('./intents/help')((err, list) => {
    if(err) return console.log(err);
    return rtm.sendMessage(list, message.channel)
  });
  if(message.text.toLowerCase().includes('siri')) {
    wit(message.text, (err, res) => {
      if(err) return console.log('ERROR'.bgRed, err);
      try {
        if(!res.intent || !res.intent[0] || !res.intent[0].value) throw new Error('Intent is required')
        const intent = require('./intents/' + res.intent[0].value); // intent router
        intent(res, (err, response) => {
          if(err) return console.log(`ERR ${err}`.red);
          return rtm.sendMessage(response, message.channel)
        })
      } catch (error) {
        console.log(error)
        return rtm.sendMessage('This command is absent use "help"', message.channel)
      }
    })
  }
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