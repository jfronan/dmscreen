import {createSubTree} from '../dataMiddleware';

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
  