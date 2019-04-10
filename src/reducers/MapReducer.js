import { PERSONAJES, DATADIR } from '../Constants';

const initialState = {
    arbol: {
        name: '',
        parentRoute: '',
        parentRef: {},
        extData: {
          npcs: []
        },
        imageRoute: '',
        subLocs: []
      },
    actualTreePath: {},
    actualPath: '',
    mapa: '',
    locDesc: '',
    detalleNPC: '',
    mostrandoDatosNPC: false
  };
  
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_ARBOL_SUCCESS':
      return {
        ...state,
        arbol: action.payload,
        actualTreePath: action.payload,
        mapa: DATADIR + action.payload.imageRoute,
        actualPath: DATADIR + '/' + action.payload.name,
        locDesc: DATADIR + '/' + action.payload.name + '/info.html'
      };

    case 'VOLVER_LOCACION_PADRE':
      if (state.actualTreePath.parentRoute === null || state.actualTreePath.parentRoute === '') {
        return state;
      }
      var lastLocationPos = state.actualPath.lastIndexOf('/' + state.actualTreePath.name);
      const parentPath = state.actualPath.substring(0, lastLocationPos)
      var parentRef = ()=> {
        var pathFragments = parentPath.split('/');
        if (pathFragments.length < 4) {
          return state.arbol;
        }
        var pointerConstruct = state.arbol;
        /* eslint no-loop-func: 0 */
        for (var i=3; i < pathFragments.length; i++) {
          pointerConstruct = pointerConstruct.subLocs.find(loc => {
            return loc.name === pathFragments[i];
          });
        };
        /* eslint no-loop-func: 0 */
        return pointerConstruct;
      }
      return {
        ...state,
        actualTreePath: parentRef(),
        mapa: parentRef.imageRoute !== '' ? DATADIR + parentRef().imageRoute : state.mapa,
        actualPath: parentPath,
        locDesc: parentPath + '/info.html',
        nombreDetalleNPC: '',
        detalleNPC: '',
        mostrandoDatosNPC: false
      };
    case 'IR_A_SUBLOC':
      const subLoc = state.actualTreePath.subLocs[action.payload];
      return {
        ...state,
        actualTreePath: subLoc,
        mapa: subLoc.imageRoute !== '' ? DATADIR + subLoc.imageRoute : state.mapa,
        actualPath: state.actualPath + '/' + subLoc.name,
        locDesc: state.actualPath + '/' + subLoc.name + '/info.html',
        nombreDetalleNPC: '',
        detalleNPC: '',
        mostrandoDatosNPC: false
      };
    case 'MOSTRAR_DETALLE_NPC':
    return {
        ...state,
        nombreDetalleNPC: action.payload,
        detalleNPC: PERSONAJES + '/npc/' + action.payload + '/profile.html',
        mostrandoDatosNPC: true
    }
    case 'OCULTAR_DETALLE_NPC':
    return {
        ...state,
        nombreDetalleNPC: '',
        detalleNPC: '',
        mostrandoDatosNPC: false
    }

    default: return state;
  }
};

export default mapReducer;
