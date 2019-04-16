const remote = window.require('electron').remote;
const {app} = remote;
var basepath = app.getAppPath();

export const APPDIR = basepath;
export const DATADIR = basepath + '/data';
export const LOCATIONS = basepath + '/data/locations';
export const PERSONAJES = basepath + '/data/personajes';
export const SAVEDATA = basepath + '/data/saveData';
export const HECHIZOS = basepath + '/data/hechizos';