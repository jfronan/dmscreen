export const cargarArbol = () => {
    // funcion que carga el arbol
    return {
      type: 'CARGAR_ARBOL_SUCCESS'
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
  