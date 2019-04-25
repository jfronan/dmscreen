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
    goToAddBeast: () => dispatch(gearActions.goToAddBeast()),
    goToEditBeast: () => dispatch(gearActions.goToEditBeast()),
    goToAddPc: () => dispatch(gearActions.goToAddPc()),
    goToEditPc: () => dispatch(gearActions.goToEditPc()),
    goToAddNpc: () => dispatch(gearActions.goToAddNpc()),
    goToEditNpc: () => dispatch(gearActions.goToEditNpc()),
    goToAddLocation: () => dispatch(gearActions.goToAddLocation()),
    goToEditLocation: () => dispatch(gearActions.goToEditLocation())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GearModal);
