import React from 'react';

export default class Editor extends React.Component {

  constructor(props) {
    super();
    this.state = {
        bestiarySearchValue: ''
    }
  }

  render() {
    let monstruos = this.props.bestiario;
    let filteredMonstruos = monstruos.filter((monstruoContainer) => monstruoContainer.monster.nombre.toLowerCase().includes(this.state.bestiarySearchValue))
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16 relative">
                    <div className="fill relative">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {filteredMonstruos.map((monstruoContainer, index)=>
                                <div key={'monstruoListGear' + monstruoContainer.monster.nombre + index}
                                    className={((this.props.selectedIndex !== null && this.props.selectedIndex === monstruoContainer.index) ? "yellowish" : "redish") + " contentTitleBox hoverPoint"}>
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.selectMonstruo(monstruoContainer.monster, monstruoContainer.index)}>
                                        {monstruoContainer.monster.nombre}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="loggerInputContainer">
                            <input
                                id="searchBar"
                                type="text"
                                className="searchBar"
                                placeholder="Buscar Monstruo"
                                value={this.state.bestiarySearchValue}
                                onChange={(event)=> this.setState({bestiarySearchValue: event.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
