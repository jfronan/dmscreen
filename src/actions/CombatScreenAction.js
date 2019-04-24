import {createCharList, createSpellList} from '../dataMiddleware';

export const cargarPersonajes = ()=> {
  return {
      type: 'CARGAR_PERSONAJES_SUCCESS',
      payload: createCharList()
  };
}

export const cargarHechizos = ()=> {
  return {
      type: 'CARGAR_HECHIZOS_SUCCESS',
      payload: createSpellList()
  };
}

export const seleccionarHechizo = (hechizo, color)=> {
  return {
      type: 'SELECCIONAR_HECHIZO',
      payload: {
        hechizo: hechizo,
        color: color
      }
  };
}

export const ocultarDetallesHechizo = ()=> {
  return {
      type: 'OCULTAR_HECHIZO'
  };
}

export const seleccionarPersonaje = (personaje, color)=> {
  return {
      type: 'SELECCIONAR_PERSONAJE',
      payload: {
        personaje: personaje,
        color: color
      }
  };
}

export const ocultarDetallesPersonaje = ()=> {
  return {
      type: 'OCULTAR_PERSONAJE'
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
