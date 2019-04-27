import Adder from './Adder';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    personajeCargado: state.gear.personajeAGuardar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeStat: (stat, value) => dispatch(gearActions.changePersonajeStat(stat, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
