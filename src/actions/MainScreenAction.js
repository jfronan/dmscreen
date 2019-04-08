import {retrieveLogs} from '../dataMiddleware';

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

export const anotar = (titulo, color, content) => {
  return {
    type: 'AGREGAR_NOTA',
    payload: {
      titulo: titulo,
      color: color,
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

export const mostrarNota = (index) => {
  return {
    type: 'MOSTRAR_NOTA',
    payload: index
  }
};

export const ocultarNota = () => {
  return {
    type: 'DEJAR_DE_MOSTRAR_NOTA'
  }
};

export const enviarMensaje = (mensaje)=> {
  var date = new Date();
  return {
    type: 'NUEVO_MENSAJE_LOGGER',
    payload: {
      dateTime: date.toLocaleString(),
      text: mensaje
    }
  }
}

export const traerLogsGuardados = ()=> {
  return async (dispatch) => {
    dispatch ({
      type: 'CARGAR_LOGS_SUCCESS',
      payload: retrieveLogs()
    });
  };
}

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
  