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

export const anotar = (titulo, content) => {
  return {
    type: 'AGREGAR_NOTA',
    payload: {
      titulo: titulo,
      content: content
    }
  }
};

export const eliminarNota = (index) => {
  return {
    type: 'REMOVER_NOTA',
    payload: index
  }
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
  