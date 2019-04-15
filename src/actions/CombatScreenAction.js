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

export const agregarAListaDeTurnos = (entidad, color)=> {
  return async (dispatch) => {
    var floatingStats = {
      actualHP: entidad.maxHP,
      init: 0,
      actualArmor: entidad.armor,
      nombreAMostrar: entidad.nombre
    };
    dispatch ({
      type: 'AGREGAR_ENTIDAD_A_TURNOS',
      payload: {
        entidad: entidad,
        color: color,
        floatingStats: floatingStats
      }
    });
  };
}

export const removeFromTurnList = (index) => {
  return async (dispatch) => {
    dispatch ({
      type: 'REMOVER_ENTIDAD_DE_TURNOS',
      payload: index
    });
  };
}

export const modifyEntityValue = (index, statKey, value) => {
  return async (dispatch) => {
    dispatch ({
      type: 'MODIFICAR_ENTIDAD_DE_TURNOS',
      payload: {
        index: index,
        stat: statKey,
        value: value
      }
    });
  };
}
