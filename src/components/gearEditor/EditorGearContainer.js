import EditorGear from './EditorGear';
import { connect } from 'react-redux';
import * as gearActions from '../../actions/GearAction';
import * as combatActions from '../../actions/CombatScreenAction';

const mapStateToProps = state => {
  return {
    showingScreen: state.gear.showingScreen,
    actualFormIsComplete: state.gear.actualFormIsComplete,
    editSelected: state.gear.editSelected
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
    editarMonstruo: () => dispatch(gearActions.editarMonstruo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditorGear);
