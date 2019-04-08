import {createCharList} from '../dataMiddleware';

export const cargarPersonajes = ()=> {
    return async (dispatch) => {
      dispatch ({
        type: 'CARGAR_PERSONAJES_SUCCESS',
        payload: createCharList()
      });
    };
}