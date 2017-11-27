const fs = require('fs');

module.exports = (callback) => {
    fs.readdir(__dirname, (err, files) => {
        if(err) return callback(err);
        let list = "Call vbot if you want run command: \n";
        files.forEach((element, index) => {
            list += `${index + 1}) ${element.slice(0, -3)}\n`;
        })
        return callback(null, list);
    })
}

