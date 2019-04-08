var path = require('path');

var devLoc = () => {
    if (process.platform === "win32" || process.platform === "win64") {
        let result = (process.argv[3] ? process.argv[3]+'/../' : false) || path.resolve(process.execPath)+'/../';
        return result;
    } else {
        let result = (process.argv[2] ? process.argv[2]+'/../' : false) || path.resolve(process.execPath)+'/../';
        return result;
    }
};

module.exports = {devLoc}