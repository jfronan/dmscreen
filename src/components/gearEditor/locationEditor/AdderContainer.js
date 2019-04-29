import Adder from './Adder';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

const mapStateToProps = state => {
  return {
    arbol: state.gear.arbol,
    actualTreePath: state.gear.actualTreePath,
    monstruosAGuardar: state.gear.extDataToSave.monsters,
    npcssAGuardar: state.gear.extDataToSave.npcs,
    imagenASubir: state.gear.imagenAGuardar,
    textAreaValue: state.gear.textAreaValue,
    nombreLocation: state.gear.tituloTextArea,
    textAreaFinalRendering: state.gear.textAreaFinalRendering,
    editingTextAreaTitle: state.gear.editingTextAreaTitle,
    bestiario: state.gear.bestiario,
    npcList: state.gear.npcList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadImage: (file) => dispatch(gearActions.uploadImage(file, "location")),
    textAreaChange: (value) => dispatch(gearActions.textAreaValue(value)),
    textAreaTitleChange: (value) => dispatch(gearActions.textAreaTitleValue(value)),
    goBackToParent: () => dispatch(gearActions.goBackToParent()),
    goToSubLoc: (index) => dispatch(gearActions.goToSubLoc(index)),
    changeStat: (stat, value) => dispatch(gearActions.changeExtData(stat, value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
