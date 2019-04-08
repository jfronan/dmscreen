import MainScreen from './MainScreen';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    modoCombate: state.main.modoCombate,
    logs: state.main.mensajesLogger,
    mapaImg: state.map.mapa
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alternarCombateMapa: () => dispatch(mainActions.alternarCombateMapa())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
