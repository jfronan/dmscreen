import Editor from './Editor';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    listaPersonajes: state.gear.listaPersonajes,
    editSelected: state.gear.editSelected,
    selectedIndex: state.gear.selectedIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPersonaje: (personaje, originalIndex) => dispatch(gearActions.selectEntity(personaje, originalIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
