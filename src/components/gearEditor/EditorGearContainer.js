import EditorGear from './EditorGear';
import { connect } from 'react-redux';
import * as gearActions from '../../actions/GearAction';
import * as combatActions from '../../actions/CombatScreenAction';
import * as mapActions from '../../actions/MapScreenAction';

const mapStateToProps = state => {
  return {
    showingScreen: state.gear.showingScreen,
    actualFormIsComplete: state.gear.actualFormIsComplete,
    editSelected: state.gear.editSelected,
    editingTextAreaTitle: state.gear.editingTextAreaTitle,
    actualTreePath: state.gear.actualTreePath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    returnToGearMenu: () => dispatch(gearActions.returnToGearMenu()),

    guardarHechizo: () => {
        dispatch(gearActions.guardarHechizo())
        .then(()=> {
            dispatch(combatActions.cargarHechizos());
        })
    },
    editarHechizo: () => dispatch(gearActions.editarHechizo()),

    guardarMonstruo: () => {
        dispatch(gearActions.guardarMonstruo())
        .then(()=> {
            dispatch(combatActions.cargarPersonajes());
        })
    },
    editarMonstruo: () => dispatch(gearActions.editarMonstruo()),

    guardarPersonaje: () => {
        dispatch(gearActions.guardarPersonaje())
        .then(()=> {
            dispatch(combatActions.cargarPersonajes());
        })
    },
    editarPersonaje: () => dispatch(gearActions.editarPersonaje()),

    guardarNPC: () => {
        dispatch(gearActions.guardarNPC())
    },
    editarNPC: () => dispatch(gearActions.editarNPC()),

    guardarLocacion: () => {
        dispatch(gearActions.guardarLocation())
        .then(()=> {
            dispatch(mapActions.cargarArbol());
        })
    },
    editarLocacion: () => dispatch(gearActions.editarLocation())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorGear);
