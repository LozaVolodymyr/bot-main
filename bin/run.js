const service = require('../server/server');
const http = require('http');
const colors = require('colors');
const async = require('async');



/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 * For development only. Move to real ENV_VAR on production
 */
const dotenv = require('dotenv');
dotenv.load({ path: '.env' || ""});


const { initSlack, addAuthenticatedHandle} = require('../server/slackClient');

const slackToken = process.env.SLACK_BOT_TOKEN;
const witToken = process.env.WIT_BOT_TOKEN;
const slackLogLevel = process.env.SLACK_LOG_LEVEL;
const witClient = require('../server/witClient')(witToken);
const serviceRegister = service.get('serviceRegister');
const server = http.createServer(service);
const routers = require('../server/routes')(service, serviceRegister);


const rtm = initSlack(slackToken, slackLogLevel, witClient, serviceRegister);
rtm.start();



   addAuthenticatedHandle(rtm, () => {
        console.log(`BOT ONLINE`.green);

    })


async.waterfall([slackConnection, mongoConnection, expressConnection], (err, result) => { 
    if(err) return console.log(`ERROR ON CONNECTION ${err}`.red);
     console.log(`ALL PROCESS CONNECTED SUCCESSFULLY`.green.bold.underline);
});

function slackConnection(callback){
 
 
        return callback();
}

function mongoConnection(callback){
    console.log(`MONGODB OFFLINE`.red); //not ready yet 
    return callback();

}

function expressConnection(callback){
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server run on ${server.address().port} in ${service.get('env')} mode.`.green);
        return callback();
    })
}

