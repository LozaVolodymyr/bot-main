const service = require('../server/server');
const http = require('http');
const colors = require('colors');
const { initSlack, addAuthenticatedHandle} = require('../server/slackClient');
const server = http.createServer();
const async = require('async');


const rtm = initSlack('xoxb-205552353666-6ZMzmSIyUSRrRqbAr96hJtQe', 'verbose');
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

