import MainScreen from './MainScreen';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';
import * as gearActions from '../actions/GearAction';

const mapStateToProps = state => {
  return {
    modoCombate: state.main.modoCombate,
    logs: state.main.mensajesLogger,
    notes: state.main.contenidoNotas,
    mapaImg: state.map.mapa
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alternarCombateMapa: () => dispatch(mainActions.alternarCombateMapa()),
    abrirModalConfig: () => dispatch(gearActions.abrirModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
