import LogWindow from './LogWindow';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    messages: state.main.mensajesLogger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    enviarMensaje: (mensaje) => dispatch(mainActions.enviarMensaje(mensaje)),
    traerLogsGuardados: () => dispatch(mainActions.traerLogsGuardados())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWindow);
