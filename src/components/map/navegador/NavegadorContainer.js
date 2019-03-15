import Navegador from './Navegador';
import { connect } from 'react-redux';
import * as mapActions from '../../../actions/MapScreenAction';

const mapStateToProps = state => {
  return {
    arbol: state.map.arbol,
    mapa: state.map.mapa,
    actualTreePath: state.map.actualTreePath,
    actualPath: state.map.actualPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarArbol: () => dispatch(mapActions.cargarArbol()),
    goBackToParent: () => dispatch(mapActions.goBackToParent()),
    goToSubLoc: (index) => dispatch(mapActions.goToSubLoc(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navegador);
