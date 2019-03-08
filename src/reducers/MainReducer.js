const initialState = {
    modoCombate: false
  };
  
const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ALTERNAR_PANTALLA_PRINCIPAL':
    return {
        ...state,
        modoCombate: !state.modoCombate
    };

    default: return state;
  }
};

export default mainReducer;
