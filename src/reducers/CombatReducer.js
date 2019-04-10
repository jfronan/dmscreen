const initialState = {
    listaPersonajes: [],
    bestiario: [],
    mostrandoFichaPJ: false,
    fichaPJStats: {
      entidad: {},
      color: null
    }
  };
  
const combatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_PERSONAJES_SUCCESS':
    return {
      ...state,
      listaPersonajes: action.payload.pcs,
      bestiario: action.payload.bestiary
    }

    case 'SELECCIONAR_PERSONAJE':
    return {
      ...state,
      mostrandoFichaPJ: true,
      fichaPJStats: {
        entidad: action.payload.personaje,
        color: action.payload.color
      }
    }
    case 'OCULTAR_PERSONAJE':
    return {
      ...state,
      mostrandoFichaPJ: false,
      fichaPJStats: initialState.fichaPJStats
    }

    default: return state;
  }
};

export default combatReducer;
