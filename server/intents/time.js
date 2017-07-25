const superagent = require('superagent')

module.exports = (intentData, register, callback) => {
 if(intentData.intent[0].value !== 'time' ) return callback( new Error(`It should be time intent, got ${intentData.intent[0].value}`));
 if(!intentData.location) return callback( new Error(`Location was missing`));
const service = register.get('time');
if(!service) return callback(null, 'Service not avaliable')
console.log(`http://${service.ip}:${service.port}/service/${intentData.location[0].value}`)
superagent.get(`http://${service.ip}:${service.port}/service/${intentData.location[0].value}`)
    .end(function(err, response){
        if(err) return console.log(err.red);
        return callback(null, `In ${intentData.location[0].value} ${response.body} now`)
    }) 


 
}