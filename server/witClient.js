const request = require('superagent')

module.exports =  (token) => (message, callback) => {
    request.get('https://api.wit.ai/message')
            .set('Authorization', `Bearer ${token}`)
            .query({v:'14.07.2017'})
            .query({q:message})
            .end((err, res) => {
                if(err) return callback(err);
                if(res.statusCode !== 200) return callback(`Unexpected status - ${res.statusCode}`)
                callback(null, res.body.entities);
            })
    console.log(`ask ${message}, token ${token}`);
}
    
