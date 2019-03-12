export const alternarCombateMapa = () => {
    return {
      type: 'ALTERNAR_PANTALLA_PRINCIPAL'
    };
};

export const ampliar = (content) => {
    return {
      type: 'ABRIR_MODAL_ZOOM',
      payload: {
        contenido: content
      }
    };
};

export const cerrarModalZoom = () => {
    return {
      type: 'CERRAR_MODAL_ZOOM'
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
  