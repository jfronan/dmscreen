import { APPDIR, LOCATIONS, PERSONAJES, SAVEDATA, HECHIZOS } from './Constants';
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
        // console.log('ARBOL:', JSON.stringify(arbol));
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
    for (let i=0; i < pcs.length; i++) {
        let file = rutaPCs + '/' + pcs[i];
        listaPersonajes.pcs = listaPersonajes.pcs.concat(require(file));
    }
    var monster = fs.readdirSync(rutaSheets)
    for (let j=0; j < monster.length; j++) {
        let file = rutaSheets + '/' + monster[j];
        if (file.endsWith('.json')) {
            var fileJson = require(file);
            if (fileJson.sheet && fileJson.sheet !== null && fileJson.sheet !== '') {
                listaPersonajes.bestiary = listaPersonajes.bestiary.concat(fileJson);
            }
        }
    }
    
    // console.log('listaPersonajes:', JSON.stringify(listaPersonajes));
    return listaPersonajes;
}

//  Hechizos
export const createSpellList = () => {
    var rutaHechizos = HECHIZOS;
    var listaHechizos = {
          hechizos: []
        };
    var hechizo = fs.readdirSync(rutaHechizos)
    for (let k=0; k < hechizo.length; k++) {
        let file = rutaHechizos + '/' + hechizo[k];
        if (file.endsWith('.json')) {
            var fileJson = require(file);
            if (fileJson.sheet && fileJson.sheet !== null && fileJson.sheet !== '') {
                listaHechizos.hechizos = listaHechizos.hechizos.concat(fileJson);
            }
        }
    }

    // console.log('listaHechizos:', JSON.stringify(listaHechizos));
    return listaHechizos;
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

export const storeNotes = (notes) => {
    fs.writeFileSync(SAVEDATA + "/notes.json", JSON.stringify(notes));
}
export const retrieveNotes = () => {
    try {
        var notes = require(SAVEDATA + "/notes.json").notes
        return {notes: notes}
    } catch (e) {
        return {notes: []}
    }
}


// Data Write
export const saveFile = (file, route, fileType) => {
    var saved = false;
    saved = fs.writeFileSync(route, file, fileType);
    return typeof saved === 'undefined';
};

// Rename File
export const renameFile = (oldRoute, newRoute) => {
    var renamed = false;
    renamed = fs.renameSync(oldRoute, newRoute);
    return typeof renamed === 'undefined';
}

// Delete File
export const unlinkFile = (route) => {
    try {
        fs.unlinkSync(route)
        //file removed
    } catch(err) {
        console.error(err)
    }
}
