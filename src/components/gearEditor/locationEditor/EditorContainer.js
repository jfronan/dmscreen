import Editor from './Editor';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    arbol: state.gear.arbol,
    actualTreePath: state.gear.actualTreePath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    goBackToParent: () => dispatch(gearActions.goBackToParent()),
    goToSubLoc: (index) => dispatch(gearActions.goToSubLoc(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
