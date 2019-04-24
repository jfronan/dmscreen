import GearModal from './GearModal';
import { connect } from 'react-redux';
import * as gearActions from '../actions/GearAction';

const mapStateToProps = state => {
  return {
    modalAbierto: state.gear.modalAbierto,
    showingScreen: state.gear.showingScreen
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cerrarModal: () => dispatch(gearActions.cerrarModal()),
    goToAddMagic: () => dispatch(gearActions.goToAddMagic()),
    goToEditMagic: () => dispatch(gearActions.goToEditMagic()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GearModal);
