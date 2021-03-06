import Editor from './Editor';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

let encapsulateSpells = (list) => {
    let encapsulatedList = [];
    for (let i=0; i < list.length; i++) {
        encapsulatedList = encapsulatedList.concat({hechizo: list[i], index: i})
    }
    return encapsulatedList;
}

const mapStateToProps = state => {
  return {
    spellList: encapsulateSpells(state.gear.spellList),
    editSelected: state.gear.editSelected,
    selectedIndex: state.gear.selectedIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectSpell: (spell, originalIndex) => dispatch(gearActions.selectEntity(spell, originalIndex)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
