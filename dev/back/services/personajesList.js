var fs = require('fs');
var path = require('path');

var devLoc = (process.argv[2] ? process.argv[2]+'/../' : false || process.argv[3] ? process.argv[3]+'/../' : false || path.resolve(process.execPath)+'/../');

var rutaPersonajes = path.join(devLoc+'data/personajes');

var createList = (req, res) => {
    var rutaPCs = rutaPersonajes + '/pcs';
    var rutaSheets = rutaPersonajes + '/statSheets';
    var listaPersonajes = {
          pcs: [],
          bestiary: []
        };
    var pcs = fs.readdirSync(rutaPCs)
    for (var i=0; i < pcs.length; i++) {
        let file = rutaPCs + '/' + pcs[i];
        listaPersonajes.pcs = listaPersonajes.pcs.concat(require(file));
    }
    var monster = fs.readdirSync(rutaSheets)
    for (var j=0; j < monster.length; j++) {
        let file = rutaSheets + '/' + monster[j];
        listaPersonajes.bestiary = listaPersonajes.bestiary.concat(require(file));
    }
    
    console.log('listaPersonajes:', JSON.stringify(listaPersonajes));
    res.json(listaPersonajes);
}

module.exports = {createList}
