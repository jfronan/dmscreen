import Adder from './Adder';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    imagenASubir: state.gear.textAreaImage,
    textAreaValue: state.gear.textAreaValue,
    nombreNPC: state.gear.tituloTextArea,
    textAreaFinalRendering: state.gear.textAreaFinalRendering
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (file) => dispatch(gearActions.uploadImage(file, "textArea")),
    textAreaChange: (value) => dispatch(gearActions.textAreaValue(value)),
    textAreaTitleChange: (value) => dispatch(gearActions.textAreaTitleValue(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
