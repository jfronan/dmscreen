import MapScreen from './MapScreen';
import { connect } from 'react-redux';
import * as mainActions from '../../actions/MainScreenAction';

const mapStateToProps = state => {
  return {
    mapa: state.map.mapa
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ampliar: (content) => dispatch(mainActions.ampliar(content))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
