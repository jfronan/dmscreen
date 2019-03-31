var fs = require('fs');
var path = require('path');
var constants = require('../constants');


var rutaLocalStorage = path.join(constants.devLoc()+'data/saveData');

var store = (req, res) => {
    const reducerData = req.body;

    fs.writeFileSync(rutaLocalStorage + "/logs.json", JSON.stringify(reducerData));
    
    process.exit();
}

var retrieve = (req, res) => {
    try {
        var logs = require(rutaLocalStorage + "/logs.json").logs
        res.json({logs: logs})
    } catch (e) {
        res.json({logs: []})
    }
}

module.exports = {store, retrieve}
