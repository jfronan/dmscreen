import {createCharList} from '../dataMiddleware';

export const cargarPersonajes = ()=> {
  return async (dispatch) => {
    dispatch ({
      type: 'CARGAR_PERSONAJES_SUCCESS',
      payload: createCharList()
    });
  };
}

export const seleccionarPersonaje = (personaje, color)=> {
  return async (dispatch) => {
    dispatch ({
      type: 'SELECCIONAR_PERSONAJE',
      payload: {
        personaje: personaje,
        color: color
      }
    });
  };
}

export const ocultarDetallesPersonaje = ()=> {
  return async (dispatch) => {
    dispatch ({
      type: 'OCULTAR_PERSONAJE'
    });
  };
}