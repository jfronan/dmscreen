import { APPDIR, LOCATIONS, PERSONAJES, SAVEDATA } from './Constants';
import { isImageString } from './utils/Utils';
var path = window.require('path');
var fs = window.require('fs');

// Locations
export const createSubTree = function(subruta, subname) {
    var ruta = subruta || LOCATIONS;
    var rutaFragment = ruta.split('/data/')[1] ? ruta.split('/data/')[1] : ruta.split('\\data\\')[1]
    var actualRoute = '/' + rutaFragment;
    var lastLocationPos = actualRoute.lastIndexOf('/' + subname);
    var arbol = {
          name: subname || 'locations',
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
            arbol.extData = window.require(extdatafileroute);
        }
        if (isImageString(items[i])) {
            arbol.imageRoute = actualRoute + '/' + items[i];
        }
        if (fs.lstatSync(file).isDirectory()) {
            arbol.subLocs.push(createSubTree((ruta + '/' + items[i]), items[i]))
        };
    }
    if (arbol.name === 'locations') {
        console.log('ARBOL:', JSON.stringify(arbol));
    }
    return arbol;
}

//  Personajes
export const createCharList = () => {
    var rutaPCs = PERSONAJES + '/pcs';
    var rutaSheets = PERSONAJES + '/statSheets';
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
        if (file.endsWith('.json')) {
            var fileJson = require(file);
            if (fileJson.sheet && fileJson.sheet !== null && fileJson.sheet !== '') {
                listaPersonajes.bestiary = listaPersonajes.bestiary.concat(fileJson);
            }
        }
    }
    
    console.log('listaPersonajes:', JSON.stringify(listaPersonajes));
    return listaPersonajes;
}



// Data Management
export const storeLogs = (logs) => {
    fs.writeFileSync(SAVEDATA + "/logs.json", JSON.stringify(logs));
}

export const retrieveLogs = () => {
    try {
        var logs = require(SAVEDATA + "/logs.json").logs
        return {logs: logs}
    } catch (e) {
        return {logs: []}
    }
}