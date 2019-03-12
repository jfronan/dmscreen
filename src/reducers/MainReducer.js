const initialState = {
    modoCombate: false,
    modalZoomAbierto: false,
    contenidoModalZoom: null
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

    default: return state;
  }
};

export default mainReducer;
