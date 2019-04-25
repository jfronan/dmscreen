import {HECHIZOS, PERSONAJES} from '../Constants';
import {spacedStringCamelCase} from '../utils/Utils';
import {saveFile, renameFile, unlinkFile} from '../dataMiddleware';

var validateFileName = (stringBase) => {
    return spacedStringCamelCase(stringBase).replace(/[^A-Z]/gi, '');
}

const initialState = {
    modalAbierto: false,
    showingScreen: '',
    spellList: [],
    bestiario: [],
    actualFormIsComplete: false,
    editSelected: {},
    selectedIndex: null,
    hechizoAGuardar: {
        nombre: '',
        sheet: '',
        level: 0,
        school: ''
    },
    monstruoAGuardar: {
        nombre: '',
        raza: '',
        sheet: '',
        rating: 0,
        maxHP: 0,
        armor: 0,
        spells: []
    },
    imagenAGuardar: ''
  };

const gearReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ABRIR_MODAL_CONFIG':
    return {
        ...state,
        modalAbierto: true
    }
    case 'CERRAR_MODAL_CONFIG':
    return initialState

    case 'VOLVER_A_GEAR_MENU':
    let modif = Object.assign({}, initialState);
    modif.modalAbierto = true;
    return modif

    case 'CARGAR_IMAGE_UPLOAD_GEAR':
    switch (action.payload.category) {
        case "spell":
        return {
            ...state,
            imagenAGuardar: action.payload.file,
            actualFormIsComplete: (action.payload.file !== '' && state.hechizoAGuardar.sheet !== '' && state.hechizoAGuardar.school !== '')
        }
        case "monster":
        return {
            ...state,
            imagenAGuardar: action.payload.file,
            actualFormIsComplete: (action.payload.file !== '' && state.monstruoAGuardar.sheet !== '' && state.monstruoAGuardar.maxHP !== '' && state.monstruoAGuardar.armor !== '')
        }

        default: 
        return {
            ...state,
            imagenAGuardar: action.payload.file
        }
    }

    case 'AGREGAR_HECHIZOS_GEAR':
    return {
        ...state,
        showingScreen: 'agregarHechizos'
    }
    case 'EDITAR_HECHIZOS_GEAR':
    return {
        ...state,
        showingScreen: 'editarHechizos',
        spellList: action.payload.hechizos
    }

    case 'AGREGAR_MONSTRUO_GEAR':
    return {
        ...state,
        showingScreen: 'agregarMonstruo',
        spellList: action.payload.hechizos
    }
    case 'EDITAR_MONSTRUO_GEAR':
    return {
        ...state,
        showingScreen: 'editarMonstruo',
        spellList: action.payload.listaHechizos.hechizos,
        bestiario: action.payload.bestiario
    }
    case 'SELECT_EDITAR_ENTIDAD_GEAR':
    return {
        ...state,
        editSelected: action.payload.entity,
        selectedIndex: action.payload.index
    }

    // Spell
    case 'CONFIRMED_EDITAR_HECHIZOS_GEAR':
    return {
        ...state,
        hechizoAGuardar: state.editSelected,
        showingScreen: 'agregarHechizos',
        imagenAGuardar: HECHIZOS + '/' + state.editSelected.sheet
    }

    case 'MODIFICAR_HECHIZO_A_GUARDAR_GEAR':
    return {
        ...state,
        hechizoAGuardar: {
            ...state.hechizoAGuardar,
            [action.payload.stat]: action.payload.value,
            sheet: (action.payload.stat === "nombre" ? (validateFileName(action.payload.value) !== '' ? validateFileName(action.payload.value) + '.png' : '') : state.hechizoAGuardar.sheet)
        },
        actualFormIsComplete: (
            state.imagenAGuardar !== ''
            && (state.hechizoAGuardar.sheet !== '' || (action.payload.stat === "nombre" && validateFileName(action.payload.value) !== ''))
            && (state.hechizoAGuardar.school !== '' || (action.payload.stat === "school" && action.payload.value !== ''))
        )
    }

    case 'GRABAR_HECHIZO_DB_GEAR':
    var saveSuccess = saveFile(JSON.stringify(state.hechizoAGuardar), (HECHIZOS + '/' + state.hechizoAGuardar.sheet).replace('.png', '.json'))
        && (!state.imagenAGuardar.endsWith('.png')
            ? saveFile(atob(state.imagenAGuardar.replace('data:image/png;base64,', '')), HECHIZOS + '/' + state.hechizoAGuardar.sheet, 'binary')
            : renameFile(state.imagenAGuardar, HECHIZOS + '/' + state.hechizoAGuardar.sheet));
    if (saveSuccess) {
        if (state.editSelected.sheet && state.editSelected.sheet !== state.hechizoAGuardar.sheet) {
            unlinkFile((HECHIZOS + '/' + state.editSelected.sheet).replace('.png', '.json'));
        }
        let modif = Object.assign({}, initialState);
        modif.modalAbierto = true;
        return modif;
    }
    return state;

    // Monstruo
    case 'CONFIRMED_EDITAR_MONSTRUO_GEAR':
    return {
        ...state,
        monstruoAGuardar: state.editSelected,
        showingScreen: 'agregarMonstruo',
        imagenAGuardar: PERSONAJES + '/statSheets/' + state.editSelected.sheet
    }

    case 'MODIFICAR_MONSTRUO_A_GUARDAR_GEAR':
    return {
        ...state,
        monstruoAGuardar: {
            ...state.monstruoAGuardar,
            [action.payload.stat]: action.payload.value,
            sheet: (action.payload.stat === "nombre" ? (validateFileName(action.payload.value) !== '' ? validateFileName(action.payload.value) + '.png' : '') : state.monstruoAGuardar.sheet)
        },
        actualFormIsComplete: (
            state.imagenAGuardar !== ''
            && (state.monstruoAGuardar.sheet !== '' || (action.payload.stat === "nombre" && validateFileName(action.payload.value) !== ''))
            && (state.monstruoAGuardar.maxHP !== null || (action.payload.stat === "maxHP" && action.payload.value !== null))
            && (state.monstruoAGuardar.armor !== null || (action.payload.stat === "armor" && action.payload.value !== null))
        )
    }
    case 'GRABAR_MONSTRUO_DB_GEAR':
    var saveSuccess = saveFile(JSON.stringify(state.monstruoAGuardar), (PERSONAJES + '/statSheets/' + state.monstruoAGuardar.sheet).replace('.png', '.json'))
        && (!state.imagenAGuardar.endsWith('.png')
            ? saveFile(atob(state.imagenAGuardar.replace('data:image/png;base64,', '')), PERSONAJES + '/statSheets/' + state.monstruoAGuardar.sheet, 'binary')
            : renameFile(state.imagenAGuardar, PERSONAJES + '/statSheets/' + state.monstruoAGuardar.sheet));
    if (saveSuccess) {
        if (state.editSelected.sheet && state.editSelected.sheet !== state.monstruoAGuardar.sheet) {
            unlinkFile((PERSONAJES + '/statSheets/' + state.editSelected.sheet).replace('.png', '.json'));
        }
        let modif = Object.assign({}, initialState);
        modif.modalAbierto = true;
        return modif;
    }
    return state;

    default: return state;
  }
};

export default gearReducer;
