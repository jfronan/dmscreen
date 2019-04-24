import Adder from './Adder';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    imagenASubir: state.gear.imagenAGuardar,
    spellCargado: state.gear.hechizoAGuardar
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (file) => dispatch(gearActions.uploadImage(file, "single")),
    changeStat: (stat, value) => dispatch(gearActions.changeSpellStat(stat, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
