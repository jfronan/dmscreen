import { LOCATIONS } from '../Constants';

const initialState = {
    arbol: {
        name: '',
        parentRoute: '',
        parentRef: {},
        extData: {},
        imageRoute: '',
        subLocs: []
      },
    actualTreePath: {},
    actualPath: LOCATIONS + '/world',
    mapa: LOCATIONS + '/world/World.jpeg',
    locDesc: LOCATIONS + '/world/info.html'
  };
  
const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_ARBOL_SUCCESS':
      return {
        ...state,
        arbol: action.payload,
        actualTreePath: action.payload,
        mapa: LOCATIONS + action.payload.imageRoute,
        actualPath: LOCATIONS + '/' + action.payload.name,
        locDesc: LOCATIONS + '/' + action.payload.name + '/info.html'
      };

    case 'VOLVER_LOCACION_PADRE':
      var lastLocationPos = state.actualPath.lastIndexOf('/' + state.actualTreePath.name);
      const parentPath = state.actualPath.substring(0, lastLocationPos)
      var parentRef = ()=> {
        var pathFragments = parentPath.split('/');
        if (pathFragments.length < 5) {
          return state.arbol;
        }
        var pointerConstruct = state.arbol;
        /* eslint no-loop-func: 0 */
        for (var i=4; i < pathFragments.length; i++) {
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
        mapa: LOCATIONS + parentRef().imageRoute,
        actualPath: parentPath,
        locDesc: parentPath + '/info.html'
      };
    case 'IR_A_SUBLOC':
      const subLoc = state.actualTreePath.subLocs[action.payload];
      return {
        ...state,
        actualTreePath: subLoc,
        mapa: LOCATIONS + subLoc.imageRoute,
        actualPath: state.actualPath + '/' + subLoc.name,
        locDesc: state.actualPath + '/' + subLoc.name + '/info.html'
      };

    default: return state;
  }
};

export default mapReducer;
