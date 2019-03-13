import Navegador from './Navegador';
import { connect } from 'react-redux';
import * as mapActions from '../../actions/MapScreenAction';

const mapStateToProps = state => {
  return {
    arbol: state.map.arbol,
    mapa: state.map.mapa
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarArbol: () => dispatch(mapActions.cargarArbol())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navegador);
