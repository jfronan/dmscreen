import Editor from './Editor';
import { connect } from 'react-redux';
import * as gearActions from '../../../actions/GearAction';

let encapsulateNPCs = (list) => {
    let encapsulatedList = [];
    for (let i=0; i < list.length; i++) {
        encapsulatedList = encapsulatedList.concat({npc: list[i], index: i})
    }
    return encapsulatedList;
}

const mapStateToProps = state => {
  return {
    npcList: encapsulateNPCs(state.gear.npcList),
    selectedIndex: state.gear.selectedIndex
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectNPC: (npc, originalIndex) => dispatch(gearActions.selectEntity(npc, originalIndex, "npc")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
