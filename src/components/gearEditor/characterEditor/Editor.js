import React from 'react';

export default class Editor extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let listaPersonajes = this.props.listaPersonajes;
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16 relative">
                    <div className="fill relative">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {listaPersonajes.map((personaje, index)=>
                                <div key={'personajeListGear' + personaje.nombre + index}
                                    className={((this.props.selectedIndex !== null && this.props.selectedIndex === index) ? "yellowish" : "greenish") + " contentTitleBox hoverPoint"}>
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.selectPersonaje(personaje, index)}>
                                        {personaje.nombre}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
