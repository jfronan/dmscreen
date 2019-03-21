import LogWindow from './LogWindow';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    locDesc: state.map.locDesc,
    actualTreePath: state.map.actualTreePath
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWindow);
