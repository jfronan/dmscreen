var fs = require('fs');
var path = require('path');
var constants = require('../constants');


var rutaLocaciones = path.join(constants.devLoc()+'data/locations/world');

const isImageString = (fileName)=> {
    return (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".svg") || fileName.endsWith(".gif"))
};

var createSubTree = function(subruta, subname) {
    var ruta = subruta || rutaLocaciones;
    var rutaFragment = ruta.split('/locations/')[1] ? ruta.split('/locations/')[1] : ruta.split('\\locations\\')[1]
    var actualRoute = '/' + rutaFragment;
    var lastLocationPos = actualRoute.lastIndexOf('/' + subname);
    var arbol = {
          name: subname || 'world',
          parentRoute: subruta ? actualRoute.substring(0, lastLocationPos) : null,
          extData: {
            npcs: []
          },
          imageRoute: '',
          subLocs: []
        };
    var items = fs.readdirSync(ruta)
    for (var i=0; i < items.length; i++) {
        var file = ruta + '/' + items[i];
        if (items[i] === 'extData.json') {
            var extdatafileroute = ruta + '/' + items[i];
            arbol.extData = require(extdatafileroute);
        }
        if (isImageString(items[i])) {
            arbol.imageRoute = actualRoute + '/' + items[i];
        }
        if (fs.lstatSync(file).isDirectory()) {
            arbol.subLocs.push(createSubTree((ruta + '/' + items[i]), items[i]))
        };
    }
    if (arbol.name === 'world') {
        console.log('ARBOL:', JSON.stringify(arbol));
    }
    return arbol;
}

var createTree = (req, res) => {
    var arbol = createSubTree();
    res.json(arbol);
}

module.exports = {createTree}