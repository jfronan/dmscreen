import { SERVER } from '../Constants'

export const cargarPersonajes = ()=> {
    return async (dispatch) => {
      fetch(SERVER + "personajesList")
      .then((response)=> response.json())
      .then((list)=> {
        dispatch ({
          type: 'CARGAR_PERSONAJES_SUCCESS',
          payload: list
        });
      })
    };
}