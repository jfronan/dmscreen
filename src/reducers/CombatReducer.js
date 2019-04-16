const initialState = {
    listaPersonajes: [],
    bestiario: [],
    hechizos: [],
    mostrandoFichaPJ: false,
    mostrandoFichaHechizo: false,
    fichaPJStats: {
      entidad: {},
      color: null
    },
    fichaHechizoStats: {
      entidad: {},
      color: null
    },
    listaTurnosParticipantes: []
  };
  
const combatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARGAR_PERSONAJES_SUCCESS':
    let initialTurnList = () => {
      try {
        let arrayFinal = [];
        for (let i = 0; i < action.payload.pcs.length; i++) {
          arrayFinal = arrayFinal.concat([{
            entidad: action.payload.pcs[i],
            color: "greenish",
            permanent: true,
            floatingStats: {
              actualHP: action.payload.pcs[i].maxHP,
              init: 0,
              actualArmor: action.payload.pcs[i].armor,
              nombreAMostrar: action.payload.pcs[i].nombre
            }
          }])
        }
        return arrayFinal;
      } catch (e) {
        return [];
      }
    }
    return {
      ...state,
      listaPersonajes: action.payload.pcs,
      bestiario: action.payload.bestiary,
      listaTurnosParticipantes: initialTurnList()
    }

    case 'CARGAR_HECHIZOS_SUCCESS':
    return {
      ...state,
      hechizos: action.payload.hechizos
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

    case 'SELECCIONAR_HECHIZO':
    return {
      ...state,
      mostrandoFichaHechizo: true,
      fichaHechizoStats: {
        entidad: action.payload.hechizo,
        color: action.payload.color
      }
    }
    case 'OCULTAR_HECHIZO':
    return {
      ...state,
      mostrandoFichaHechizo: false,
      fichaHechizoStats: initialState.fichaHechizoStats
    }

    case 'AGREGAR_ENTIDAD_A_TURNOS':
    return {
      ...state,
      listaTurnosParticipantes: state.listaTurnosParticipantes.concat(action.payload)
    }

    case 'REMOVER_ENTIDAD_DE_TURNOS':
    // Se usa slice(0) para almacenar el valor del campo del state en vez de la referencia
    const nuevoContenido = state.listaTurnosParticipantes.slice(0);
    // Se hace en linea sepaarada, porque la funcion, en realidad, retorna el elemento eliminado
    nuevoContenido.splice(action.payload, 1);
    return {
      ...state,
      listaTurnosParticipantes: nuevoContenido
    }

    case 'MODIFICAR_ENTIDAD_DE_TURNOS':
    let modifiedLista = state.listaTurnosParticipantes;
    modifiedLista[action.payload.index].floatingStats[action.payload.stat] = action.payload.value; 
    return {
      ...state,
      listaTurnosParticipantes: modifiedLista
    }

    default: return state;
  }
};

export default combatReducer;
