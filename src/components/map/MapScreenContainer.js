import MapScreen from './MapScreen';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    modoCombate: state.main.modoCombate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    alternarCombateMapa: () => dispatch(mainActions.alternarCombateMapa())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
