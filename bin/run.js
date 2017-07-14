const service = require('../server/server');
const http = require('http');
const colors = require('colors');
const async = require('async');


const { initSlack, addAuthenticatedHandle} = require('../server/slackClient');

const slackToken = process.env.SLACK_BOT_TOKEN || 'xoxb-205552353666-QebxKECMNTZyExoGIxie1dIL';
const witToken = process.env.WIT_BOT_TOKEN || 'AGFLNR3CKY6EEXV57SJGSETVX4QMT7A5';
const slackLogLevel = process.env.SLACK_LOG_LEVEL || 'verbose';
const witClient = require('../server/witClient')(witToken);

const server = http.createServer();

const rtm = initSlack(slackToken, slackLogLevel, witClient);
rtm.start();



async.waterfall([slackConnection, mongoConnection, expressConnection], (err, result) => {
    if(err) return console.log(`ERROR ON CONNECTION ${err}`.red);
     console.log(`ALL PROCESS CONNECTED SUCCESSFULLY`.green.bold.underline);
});

function slackConnection(callback){
    addAuthenticatedHandle(rtm, () => {
        console.log(`BOT ONLINE`.green);
        return callback();
    })

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

