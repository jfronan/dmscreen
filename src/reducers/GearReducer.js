import {HECHIZOS, PERSONAJES, DATADIR} from '../Constants';
import {spacedStringCamelCase, capitalizeEveryWord} from '../utils/Utils';
import {saveFile, renameFile, unlinkFile, mkdir, unlinkDir} from '../dataMiddleware';
var fs = window.require('fs');

function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

var validateFileName = (stringBase) => {
    return spacedStringCamelCase(stringBase).replace(/[^A-Z]/gi, '');
}

var createHTMLTextArea = (textAreaContent, textAreaImg) => {
    let content = `<textarea class="writableTextArea flex1" disabled>${textAreaContent}</textarea>`
    if (textAreaImg && textAreaImg !== '') {
        content = content + `<img src="./npcImg.png"/>`
    }
    return content;
}

const initialState = {
    modalAbierto: false,
    showingScreen: '',
    spellList: [],
    bestiario: [],
    listaPersonajes: [],
    npcList: [],
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
    personajeAGuardar: {
        nombre: '',
        raza: '',
        clases: [],
        background: '',
        alignment: '',
        level: 1,
        experience: 0,
        maxHP: 0,
        armor: 0,
        speed: 0,
        proficiency: 2,
        maxHitDice: [],
        strength: 8,
        dexterity: 8,
        constitution: 8,
        intelligence: 8,
        wisdom: 8,
        charisma: 8,
        proficiencies: [],
        expertise: [],
        resistances: [],
        immunities: [],
        additionalInit: 0,
        additionalPercep: 0,
        darkvision: 0,
        abilities: ''
    },
    arbol: {},
    actualTreePath: {},
    actualPath: '',
    extDataToSave: {
        npcs: [],
        monsters: []
    },
    tituloTextArea: '',
    editingTextAreaTitle: '',
    textAreaValue: '',
    textAreaFinalRendering: '',
    textAreaImage: '',
    nombreDeArchivo: '',
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
        case "textArea":
        return {
            ...state,
            textAreaImage: action.payload.file,
            actualFormIsComplete: (action.payload.file !== '' && state.tituloTextArea !== '')
        }
        case "location":
        return {
            ...state,
            imagenAGuardar: action.payload.file,
            actualFormIsComplete: (state.tituloTextArea !== '')
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

    case 'AGREGAR_PC_GEAR':
    return {
        ...state,
        showingScreen: 'agregarPersonaje',
        //spellList: action.payload.hechizos
    }
    case 'EDITAR_PC_GEAR':
    return {
        ...state,
        showingScreen: 'editarPersonaje',
        //spellList: action.payload.listaHechizos.hechizos,
        listaPersonajes: action.payload.listaPersonajes
    }

    case 'AGREGAR_NPC_GEAR':
    return {
        ...state,
        showingScreen: 'agregarNPC'
    }
    case 'EDITAR_NPC_GEAR':
    return {
        ...state,
        showingScreen: 'editarNPC',
        npcList: action.payload
    }

    case 'AGREGAR_LOCATION_GEAR':
    return {
        ...state,
        showingScreen: 'agregarLocacion',
        arbol: action.payload.arbol,
        npcList: action.payload.listaNPCs,
        bestiario: action.payload.bestiario,
        actualTreePath: action.payload.arbol,
        actualPath: DATADIR + '/' + action.payload.arbol.name
    }
    case 'EDITAR_LOCATION_GEAR':
    return {
        ...state,
        showingScreen: 'editarLocacion',
        arbol: action.payload.arbol,
        npcList: action.payload.listaNPCs,
        bestiario: action.payload.bestiario,
        actualTreePath: action.payload.arbol,
        actualPath: DATADIR + '/' + action.payload.arbol.name
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

    // Personaje
    case 'CONFIRMED_EDITAR_PERSONAJE_GEAR':
    return {
        ...state,
        personajeAGuardar: state.editSelected,
        showingScreen: 'agregarPersonaje',
        nombreDeArchivo: validateFileName(state.editSelected.nombre) + '.json'
    }
    case 'MODIFICAR_PERSONAJE_A_GUARDAR_GEAR':
    return {
        ...state,
        personajeAGuardar: {
            ...state.personajeAGuardar,
            [action.payload.stat]: action.payload.value
        },
        nombreDeArchivo: (action.payload.stat === "nombre" ? (validateFileName(action.payload.value) !== '' ? validateFileName(action.payload.value) + '.json' : '') : state.nombreDeArchivo),
        actualFormIsComplete: (
            (state.nombreDeArchivo !== '' || (action.payload.stat === "nombre" && validateFileName(action.payload.value) !== ''))
            && (state.personajeAGuardar.maxHP !== null || (action.payload.stat === "maxHP" && action.payload.value !== null))
            && (state.personajeAGuardar.armor !== null || (action.payload.stat === "armor" && action.payload.value !== null))
        )
    }
    
    case 'GRABAR_PERSONAJE_DB_GEAR':
    var saveSuccess = saveFile(JSON.stringify(state.personajeAGuardar), (PERSONAJES + '/pcs/' + state.nombreDeArchivo))
    if (saveSuccess) {
        let modif = Object.assign({}, initialState);
        modif.modalAbierto = true;
        return modif;
    }
    return state;
    
    // TEXTAREA
    case 'SELECT_EDITAR_NPC_GEAR':
    return {
        ...state,
        editingTextAreaTitle: action.payload.entity,
        selectedIndex: action.payload.index,
        textAreaImage: PERSONAJES + '/npc/' + action.payload.entity + '/npcImg.png',
        textAreaFinalRendering: fs.readFileSync(PERSONAJES + '/npc/' + action.payload.entity + '/profile.html', 'utf8').split("<img")[0]
    }
    case 'CONFIRMED_EDITAR_NPC_GEAR':
    return {
        ...state,
        textAreaValue: state.textAreaFinalRendering.replace('<textarea class="writableTextArea flex1" disabled>', '').replace("</textarea>", ''),
        showingScreen: 'agregarNPC',
        tituloTextArea: state.editingTextAreaTitle
    }
    case 'MODIFICAR_TEXTAREA_A_GUARDAR_GEAR':
    return {
        ...state,
        textAreaValue: action.payload,
        textAreaFinalRendering: createHTMLTextArea(action.payload),
        actualFormIsComplete: (state.tituloTextArea !== '')
    }
    case 'MODIFICAR_TITULO_TEXTAREA_GEAR':
    return {
        ...state,
        tituloTextArea: action.payload,
        actualFormIsComplete: (action.payload && action.payload !== '')
    }
    case 'GRABAR_NPC_DB_GEAR':
    var dirName = capitalizeEveryWord(state.tituloTextArea.replace(/[^A-Z]/gi, ''));
    var saveSuccess = ((state.editingTextAreaTitle !== '' && state.editingTextAreaTitle !== state.dirName)
            ? renameFile(PERSONAJES + '/npc/' + state.editingTextAreaTitle, PERSONAJES + '/npc/' + dirName)
            : mkdir(PERSONAJES + '/npc/' + dirName))
        && saveFile(createHTMLTextArea(state.textAreaValue, state.textAreaImage), (PERSONAJES + '/npc/' + dirName + '/profile.html'))
        && (!state.textAreaImage.endsWith('.png'))
            ? saveFile(atob(state.textAreaImage.replace('data:image/png;base64,', '')), PERSONAJES + '/npc/' + dirName + "/npcImg.png", 'binary')
            : true;
    if (saveSuccess) {
        let modif = Object.assign({}, initialState);
        modif.modalAbierto = true;
        return modif;
    }
    return state;

    // Location
    case 'CONFIRMED_EDITAR_LOCATION_GEAR':
    let infoHTML = fs.readFileSync(state.actualPath + '/info.html', 'utf8');
    let title = state.actualTreePath.name;
    return {
        ...state,
        textAreaFinalRendering: infoHTML,
        textAreaValue: infoHTML.replace('<textarea class="writableTextArea flex1" disabled>', '').replace("</textarea>", ''),
        showingScreen: 'agregarLocacion',
        tituloTextArea: title,
        editingTextAreaTitle: title,
        imagenAGuardar: state.actualPath + '/locationImg.png',
        extDataToSave: requireUncached(state.actualPath + '/extData.json')
    }
    case 'VOLVER_LOCACION_PADRE_GEAR':
      if (state.actualTreePath.parentRoute === null || state.actualTreePath.parentRoute === '') {
        return state;
      }
      var lastLocationPos = state.actualPath.lastIndexOf('/' + state.actualTreePath.name);
      const parentPath = state.actualPath.substring(0, lastLocationPos)
      var parentRef = ()=> {
        var pathFragments = parentPath.split('/');
        if (pathFragments.length < 4) {
          return state.arbol;
        }
        var pointerConstruct = state.arbol;
        /* eslint no-loop-func: 0 */
        for (var i=3; i < pathFragments.length; i++) {
          pointerConstruct = pointerConstruct.subLocs.find(loc => {
            return loc.name === pathFragments[i];
          });
        };
        /* eslint no-loop-func: 0 */
        return pointerConstruct;
      }
      return {
        ...state,
        actualTreePath: parentRef(),
        actualPath: parentPath
      };
    case 'IR_A_SUBLOC_GEAR':
        let subLoc = state.actualTreePath.subLocs[action.payload];
        return {
            ...state,
            actualTreePath: subLoc,
            actualPath: state.actualPath + '/' + subLoc.name
        };
    case 'MODIFICAR_EXTDATA_A_GUARDAR_GEAR':
    return {
        ...state,
        extDataToSave: {
            ...state.extDataToSave,
            [action.payload.stat]: action.payload.value
        },
        actualFormIsComplete: (state.tituloTextArea !== '')
    }

    case 'GRABAR_LOCATION_DB_GEAR':
    var isEdited = state.editingTextAreaTitle !== '';
    var actualPath = state.actualPath.slice(0);
    if (isEdited) {
        actualPath = actualPath.substring(0, actualPath.lastIndexOf('/'));
    }
    var dirName = capitalizeEveryWord(state.tituloTextArea.replace(/[^A-Z]/gi, ''));
    var saveSuccess = ((isEdited && state.editingTextAreaTitle !== state.dirName)
            ? renameFile(actualPath + '/' + state.editingTextAreaTitle, actualPath + '/' + dirName)
            : mkdir(actualPath + '/' + dirName))
        && saveFile(JSON.stringify(state.extDataToSave), (actualPath + '/' + dirName + '/extData.json'))
        && saveFile(createHTMLTextArea(state.textAreaValue), (actualPath + '/' + dirName + '/info.html'))
        && (!state.imagenAGuardar.endsWith('.png'))
            ? saveFile(atob(state.imagenAGuardar.replace('data:image/png;base64,', '')), actualPath + '/' + dirName + "/locationImg.png", 'binary')
            : true;
    if (saveSuccess) {
        let modif = Object.assign({}, initialState);
        modif.modalAbierto = true;
        return modif;
    }
    return state;


    default: return state;
  }
};

export default gearReducer;
