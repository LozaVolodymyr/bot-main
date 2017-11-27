const service = require('../server/server');
const http = require('http');
const colors = require('colors');
const async = require('async');


<<<<<<< HEAD

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
=======
const { initSlack, addAuthenticatedHandle} = require('../server/slackClient');

const slackToken = process.env.SLACK_BOT_TOKEN || 'xoxb-205552353666-QebxKECMNTZyExoGIxie1dIL';
const witToken = process.env.WIT_BOT_TOKEN || 'AGFLNR3CKY6EEXV57SJGSETVX4QMT7A5';
const slackLogLevel = process.env.SLACK_LOG_LEVEL || 'verbose';
const witClient = require('../server/witClient')(witToken);

const server = http.createServer();

const rtm = initSlack(slackToken, slackLogLevel, witClient);
>>>>>>> 3663c4e... 1.1.0
rtm.start();



<<<<<<< HEAD
   addAuthenticatedHandle(rtm, () => {
        console.log(`BOT ONLINE`.green);

    })


async.waterfall([slackConnection, mongoConnection, expressConnection], (err, result) => { 
=======
async.waterfall([slackConnection, mongoConnection, expressConnection], (err, result) => {
>>>>>>> 3663c4e... 1.1.0
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

