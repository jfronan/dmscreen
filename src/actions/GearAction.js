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
export const selectSpell = (spell, realIndex) => {
    return {
      type: 'SELECT_EDITAR_HECHIZOS_GEAR',
      payload: {
        spell: spell,
        index: realIndex
      }
    };
}
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
            type: 'GRABAR_HECHIZO_DB_GEAR',
            dispatch: dispatch
        })
    }
}
