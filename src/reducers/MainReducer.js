const initialState = {
    modoCombate: false,
    modalZoomAbierto: false,
    contenidoModalZoom: null,
    contenidoNotas: []
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
      return {
        ...state,
        contenidoNotas: state.contenidoNotas.concat(action.payload)
      }
    case 'REMOVER_NOTA':
      return {
        ...state,
        contenidoNotas: state.contenidoNotas.splice(action.payload, 1)
      }

    default: return state;
  }
};

export default mainReducer;
