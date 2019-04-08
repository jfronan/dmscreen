const initialState = {
    modoCombate: false,
    modalZoomAbierto: false,
    contenidoModalZoom: null,
    contenidoNotas: [],
    mostrandoNota: null,
    mensajesLogger: []
  };
  
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALTERNAR_PANTALLA_PRINCIPAL':
    return {
        ...state,
        modoCombate: !state.modoCombate
    };
    case 'ABRIR_MODAL_ZOOM':
    return {
        ...state,
        modalZoomAbierto: true,
        contenidoModalZoom: action.payload.contenido
    }
    case 'CERRAR_MODAL_ZOOM':
    return {
        ...state,
        modalZoomAbierto: false,
        contenidoModalZoom: null
    }
    case 'AGREGAR_NOTA':
      const isAlreadyAdded = () => {
        for (var i=0; i < state.contenidoNotas.length; i++) {
          if ((state.contenidoNotas[i].titulo === action.payload.titulo)
            && (state.contenidoNotas[i].color === action.payload.color)) {
            return true;
          }
        }
        return false;
      }
      return {
        ...state,
        contenidoNotas: isAlreadyAdded() ? state.contenidoNotas : state.contenidoNotas.concat(action.payload)
      }
    case 'REMOVER_NOTA':
      // Se usa slice(0) para almacenar el valor del campo del state en vez de la referencia
      const nuevoContenido = state.contenidoNotas.slice(0);
      // Se hace en linea sepaarada, porque la funcion, en realidad, retorna el elemento eliminado
      nuevoContenido.splice(action.payload, 1);
      return {
        ...state,
        contenidoNotas: nuevoContenido
      }
    case 'MOSTRAR_NOTA':
      return {
        ...state,
        mostrandoNota: action.payload
      }
    case 'DEJAR_DE_MOSTRAR_NOTA':
      return {
        ...state,
        mostrandoNota: null
      }
    case 'NUEVO_MENSAJE_LOGGER':
      return {
        ...state,
        mensajesLogger: state.mensajesLogger.concat(action.payload)
      }
    case 'CARGAR_LOGS_SUCCESS':
    return {
      ...state,
      mensajesLogger: action.payload.logs
    }

    default: return state;
  }
};

export default mainReducer;
