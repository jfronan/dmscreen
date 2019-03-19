var fs = require('fs');
var path = require('path');

var rutaLocaciones = path.join(__dirname+'/../../data/locations/world')

const isImageString = (fileName)=> {
    return (fileName.endsWith(".png") || fileName.endsWith(".jpg") || fileName.endsWith(".jpeg") || fileName.endsWith(".svg") || fileName.endsWith(".gif"))
};

var createTree = function(subruta, subname) {
    var ruta = subruta || rutaLocaciones;
    var actualRoute = '/' + ruta.split('/locations/')[1];
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
    console.log(items);
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
            arbol.subLocs.push(createTree((ruta + '/' + items[i]), items[i]))
        };
    }
    if (arbol.name === 'world') {
        console.log('ARBOL:', JSON.stringify(arbol));
    }
    return arbol;

}

module.exports = createTree()
