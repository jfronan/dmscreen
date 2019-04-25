import * as dataMiddleware from '../dataMiddleware';

export const abrirModal = (content) => {
  return {
    type: 'ABRIR_MODAL_CONFIG'
  };
};

export const cerrarModal = () => {
    return {
      type: 'CERRAR_MODAL_CONFIG'
    };
};

export const returnToGearMenu = () => {
    return {
      type: 'VOLVER_A_GEAR_MENU' 
    };
}

export const uploadImage = (file, category) => {
    return async (dispatch) => {
        const reader = new FileReader()
        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            dispatch ({
                type: 'CARGAR_IMAGE_UPLOAD_GEAR',
                payload: {
                    file: ('data:image/png;base64,' + btoa(reader.result)),
                    category: category
                }
            })
        }
        reader.readAsBinaryString(file);
    }
}

export const goToAddMagic = () => {
    return {
      type: 'AGREGAR_HECHIZOS_GEAR'
    };
}
export const goToEditMagic = () => {
    let listaHechizos = dataMiddleware.createSpellList();
    return {
      type: 'EDITAR_HECHIZOS_GEAR',
      payload: listaHechizos
    };
}
export const goToAddBeast = () => {
    let listaHechizos = dataMiddleware.createSpellList();
    return {
        type: 'AGREGAR_MONSTRUO_GEAR',
        payload: listaHechizos
    };
}
export const goToEditBeast = () => {
    let listaHechizos = dataMiddleware.createSpellList();
    let bestiario = dataMiddleware.createBestiaryList();
    return {
        type: 'EDITAR_MONSTRUO_GEAR',
        payload: {
            listaHechizos: listaHechizos,
            bestiario: bestiario
        }
    };
}
export const goToAddPc = () => {
    return {
        type: 'AGREGAR_PC_GEAR'
    };
}
export const goToEditPc = () => {
    return {
        type: 'EDITAR_PC_GEAR'
    };
}
export const goToAddNpc = () => {
    return {
        type: 'AGREGAR_NPC_GEAR'
    };
}
export const goToEditNpc = () => {
    return {
        type: 'EDITAR_NPC_GEAR'
    };
}
export const goToAddLocation = () => {
    return {
        type: 'AGREGAR_LOCATION_GEAR'
    };
}
export const goToEditLocation = () => {
    return {
        type: 'EDITAR_LOCATION_GEAR'
    };
}

export const selectEntity = (entity, realIndex) => {
    return {
      type: 'SELECT_EDITAR_ENTIDAD_GEAR',
      payload: {
        entity: entity,
        index: realIndex
      }
    };
}

// Spell
export const editarHechizo = () => {
    return {
      type: 'CONFIRMED_EDITAR_HECHIZOS_GEAR',
    };
}

export const changeSpellStat = (stat, value) => {
    return {
        type: 'MODIFICAR_HECHIZO_A_GUARDAR_GEAR',
        payload: {
            stat: stat,
            value: value
        }
    };
}

export const guardarHechizo = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'GRABAR_HECHIZO_DB_GEAR'
        })
    }
}

// Monster
export const editarMonstruo = () => {
    return {
      type: 'CONFIRMED_EDITAR_MONSTRUO_GEAR',
    };
}

export const changeMonsterStat = (stat, value) => {
    return {
        type: 'MODIFICAR_MONSTRUO_A_GUARDAR_GEAR',
        payload: {
            stat: stat,
            value: value
        }
    };
}

export const guardarMonstruo = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'GRABAR_MONSTRUO_DB_GEAR'
        })
    }
}

