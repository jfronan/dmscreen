import React from 'react';

export default class Editor extends React.Component {

  constructor(props) {
    super();
    this.state = {
        hechizosSearchValue: ''
    }
  }

  render() {
    let hechizos = this.props.spellList;
    let filteredHechizos = hechizos.filter((hechizoContainer) => hechizoContainer.hechizo.nombre.toLowerCase().includes(this.state.hechizosSearchValue))
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16 relative">
                    <div className="fill relative">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {filteredHechizos.map((hechizoContainer, index)=>
                                <div key={'hechizoListGear' + hechizoContainer.hechizo.nombre + index}
                                    className={((this.props.selectedIndex !== null && this.props.selectedIndex === hechizoContainer.index) ? "yellowish" : "violet") + " contentTitleBox hoverPoint"}>
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.selectSpell(hechizoContainer.hechizo, hechizoContainer.index)}>
                                        {hechizoContainer.hechizo.nombre}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="loggerInputContainer">
                            <input
                                id="searchBar"
                                type="text"
                                className="searchBar"
                                placeholder="Buscar Hechizo"
                                value={this.state.hechizosSearchValue}
                                onChange={(event)=> this.setState({hechizosSearchValue: event.target.value})}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
