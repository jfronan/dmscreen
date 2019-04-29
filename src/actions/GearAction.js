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
                    category: category,
                    originalFileName: file.name
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
    //let listaHechizos = dataMiddleware.createSpellList();
    return {
        type: 'AGREGAR_PC_GEAR',
        //payload: listaHechizos
    };
}
export const goToEditPc = () => {
    //let listaHechizos = dataMiddleware.createSpellList();
    let listaPersonajes = dataMiddleware.createPCsList();
    return {
        type: 'EDITAR_PC_GEAR',
        payload: {
            //listaHechizos: listaHechizos,
            listaPersonajes: listaPersonajes
        }
    };
}
export const goToAddNpc = () => {
    return {
        type: 'AGREGAR_NPC_GEAR'
    };
}
export const goToEditNpc = () => {
    let listaNPCs = dataMiddleware.createNPCList();
    return {
        type: 'EDITAR_NPC_GEAR',
        payload: listaNPCs
    };
}
export const goToAddLocation = () => {
    let arbol = dataMiddleware.createSubTree();
    let listaNPCs = dataMiddleware.createNPCList();
    let bestiario = dataMiddleware.createBestiaryList();
    return {
        type: 'AGREGAR_LOCATION_GEAR',
        payload: {
            arbol: arbol,
            listaNPCs: listaNPCs,
            bestiario: bestiario
        }
    };
}
export const goToEditLocation = () => {
    let arbol = dataMiddleware.createSubTree();
    let listaNPCs = dataMiddleware.createNPCList();
    let bestiario = dataMiddleware.createBestiaryList();
    return {
        type: 'EDITAR_LOCATION_GEAR',
        payload: {
            arbol: arbol,
            listaNPCs: listaNPCs,
            bestiario: bestiario
        }
    };
}

export const selectEntity = (entity, realIndex, category) => {
    if (category && category === "npc") {
        return {
            type: 'SELECT_EDITAR_NPC_GEAR',
            payload: {
              entity: entity,
              index: realIndex
            }
        };
    }
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

// Personaje
export const editarPersonaje = () => {
    return {
      type: 'CONFIRMED_EDITAR_PERSONAJE_GEAR',
    };
}
export const changePersonajeStat = (stat, value) => {
    return {
        type: 'MODIFICAR_PERSONAJE_A_GUARDAR_GEAR',
        payload: {
            stat: stat,
            value: value
        }
    };
}

export const guardarPersonaje = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'GRABAR_PERSONAJE_DB_GEAR'
        })
    }
}

// TEXTAREA
export const textAreaValue = (value) => {
    return {
        type: 'MODIFICAR_TEXTAREA_A_GUARDAR_GEAR',
        payload: value
    };
}
export const textAreaTitleValue = (value) => {
    return {
        type: 'MODIFICAR_TITULO_TEXTAREA_GEAR',
        payload: value
    };
}

export const guardarNPC = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'GRABAR_NPC_DB_GEAR'
        })
    }
}

export const editarNPC = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'CONFIRMED_EDITAR_NPC_GEAR'
        })
    }
}

// Location
  export const goBackToParent = () => {
    return (dispatch) => {
        dispatch ({
            type: 'VOLVER_LOCACION_PADRE_GEAR'
        })
    };
  };
  
  export const goToSubLoc = (index) => {
    return (dispatch) => {
        dispatch ({
            type: 'IR_A_SUBLOC_GEAR',
            payload: index
        })
    };
  };
  export const changeExtData = (stat, value) => {
    return {
        type: 'MODIFICAR_EXTDATA_A_GUARDAR_GEAR',
        payload: {
            stat: stat,
            value: value
        }
    };
  }
  export const guardarLocation = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'GRABAR_LOCATION_DB_GEAR'
        })
    }
  }
  export const editarLocation = () => {
    return async (dispatch) => {
        dispatch ({
            type: 'CONFIRMED_EDITAR_LOCATION_GEAR'
        })
    }    
  }
