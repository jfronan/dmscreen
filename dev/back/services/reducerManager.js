var fs = require('fs');
var path = require('path');

var devLoc = (process.argv[2] ? process.argv[2]+'/../' : false || process.argv[3] ? process.argv[3]+'/../' : false || path.resolve(process.execPath)+'/../');

var rutaLocalStorage = path.join(devLoc+'data/saveData');

var store = (req, res) => {
    const reducerData = req.body;

    fs.writeFileSync(rutaLocalStorage + "/logs.json", JSON.stringify(reducerData));
    
    process.exit();
}

var retrieve = (req, res) => {
    var logs = require(rutaLocalStorage + "/logs.json").logs
    res.json({logs: logs})
}

module.exports = {store, retrieve}
