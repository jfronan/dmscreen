import Turnos from './Turnos';
import { connect } from 'react-redux';
import * as mapActions from '../../../actions/MapScreenAction';

const mapStateToProps = state => {
  return {
    arbol: state.map.arbol,
    actualTreePath: state.map.actualTreePath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cargarArbol: () => dispatch(mapActions.cargarArbol()),
    goBackToParent: () => dispatch(mapActions.goBackToParent()),
    goToSubLoc: (index) => dispatch(mapActions.goToSubLoc(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Turnos);
