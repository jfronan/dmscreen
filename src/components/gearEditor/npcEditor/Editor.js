import React from 'react';

export default class Editor extends React.Component {

  constructor(props) {
    super();
    this.state = {
        npcSearchValue: ''
    }
  }

  render() {
    let npcList = this.props.npcList;
    let filteredNpcList = npcList.filter((npcContainer) => npcContainer.npc.toLowerCase().includes(this.state.npcSearchValue))
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16 relative">
                    <div className="fill relative">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {filteredNpcList.map((npcContainer, index)=>
                                <div key={'npcListGear' + npcContainer.npc + index}
                                    className={((this.props.selectedIndex !== null && this.props.selectedIndex === npcContainer.index) ? "violet" : "yellowish") + " contentTitleBox hoverPoint"}>
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.selectNPC(npcContainer.npc, npcContainer.index)}>
                                        {npcContainer.npc}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="loggerInputContainer">
                            <input
                                id="searchBar"
                                type="text"
                                className="searchBar"
                                placeholder="Buscar NPC"
                                value={this.state.npcSearchValue}
                                onChange={(event)=> this.setState({npcSearchValue: event.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
