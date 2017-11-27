const fs = require('fs');

module.exports = (callback) => {
    fs.readdir(__dirname, (err, files) => {
        if(err) return callback(err);
<<<<<<< HEAD
        let list = "Call vbot if you want run command: \n";
=======
        let list = "Call siri if you want run command: \n";
>>>>>>> 3663c4e... 1.1.0
        files.forEach((element, index) => {
            list += `${index + 1}) ${element.slice(0, -3)}\n`;
        })
        return callback(null, list);
    })
}

