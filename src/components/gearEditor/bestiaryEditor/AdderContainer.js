import Adder from './Adder';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    imagenASubir: state.gear.imagenAGuardar,
    monstruoCargado: state.gear.monstruoAGuardar,
    spellList: state.gear.spellList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (file) => dispatch(gearActions.uploadImage(file, "monster")),
    changeStat: (stat, value) => dispatch(gearActions.changeMonsterStat(stat, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
