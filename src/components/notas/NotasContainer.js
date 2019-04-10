import Notas from './Notas';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    contenidoNotas: state.main.contenidoNotas,
    mostrandoNota: state.main.mostrandoNota
  };
};

const mapDispatchToProps = dispatch => {
  return {
    mostrarNota: (index) => dispatch(mainActions.mostrarNota(index)),
    ocultarNota: () => dispatch(mainActions.ocultarNota()),
    anotar: (titulo, color, content) => dispatch(mainActions.anotar(titulo, color, content)),
    eliminarNota: (index) => dispatch(mainActions.eliminarNota(index)),
    traerNotasGuardadas: () => dispatch(mainActions.traerNotasGuardadas())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notas);
