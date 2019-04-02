import { SERVER } from '../Constants';
var path = window.require('path');
const remote = window.require('electron').remote;
const {app} = remote;
var basepath = app.getAppPath();
var fs = window.require('fs');

var rutaLocaciones = basepath+'/dev/data/locations/world';

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
            console.log(extdatafileroute);
            arbol.extData = window.require(extdatafileroute);
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

export const cargarArbol = () => {
  return async (dispatch) => {
    var arbol = createSubTree();
    dispatch ({
      type: 'CARGAR_ARBOL_SUCCESS',
      payload: arbol
    });
  };
};
export const goBackToParent = () => {
  return (dispatch) => {
      dispatch ({
          type: 'VOLVER_LOCACION_PADRE'
      })
  };
};

export const goToSubLoc = (index) => {
  return (dispatch) => {
      dispatch ({
          type: 'IR_A_SUBLOC',
          payload: index
      })
  };
};

export const mostrarDetallesNPC = (npc) => {
  return (dispatch) => {
    dispatch ({
        type: 'MOSTRAR_DETALLE_NPC',
        payload: npc
    })
  };
};

export const ocultarDetallesNPC = () => {
  return (dispatch) => {
    dispatch ({
        type: 'OCULTAR_DETALLE_NPC'
    })
  };
};

  /*
export const getEjecutivosFailure = (payload) => {
    return async (dispatch) => {
      dispatch({
        type: GET_EJECUTIVOS_FAILURE
      });
      dispatch(modalAction.showError(payload.error));
    };
  };
  */
  