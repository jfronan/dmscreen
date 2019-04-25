import Editor from './Editor';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

let encapsulateSpells = (list) => {
    let encapsulatedList = [];
    for (let i=0; i < list.length; i++) {
        encapsulatedList = encapsulatedList.concat({monster: list[i], index: i})
    }
    return encapsulatedList;
}

const mapStateToProps = state => {
  return {
    bestiario: encapsulateSpells(state.gear.bestiario),
    editSelected: state.gear.editSelected,
    selectedIndex: state.gear.selectedIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectMonstruo: (monstruo, originalIndex) => dispatch(gearActions.selectEntity(monstruo, originalIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
