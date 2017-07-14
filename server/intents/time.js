

module.exports = (intentData, callback) => {
 if(intentData.intent[0].value !== 'time' ) return callback( new Error(`It should be time intent, got ${intentData.intent[0].value}`));
 if(!intentData.location) return callback( new Error(`Location was missing`));
 return callback(null, `Test from - ${intentData.location[0].value}`)
 
}