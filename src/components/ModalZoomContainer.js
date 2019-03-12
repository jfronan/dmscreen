import ModalZoom from './ModalZoom';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    modalZoomAbierto: state.main.modalZoomAbierto,
    contenidoModalZoom: state.main.contenidoModalZoom
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cerrarModal: () => dispatch(mainActions.cerrarModalZoom())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalZoom);
