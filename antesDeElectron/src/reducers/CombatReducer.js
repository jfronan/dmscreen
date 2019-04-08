const initialState = {
    listaPersonajes: [],
    bestiario: []
  };
  
const combatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_PERSONAJES_SUCCESS':
    return {
      ...state,
      listaPersonajes: action.payload.pcs,
      bestiario: action.payload.bestiary
    }

    default: return state;
  }
};

export default combatReducer;
