import React from 'react';
import ShareableWindow from '../../ShareableWindow';

export default class Personajes extends React.Component {

  constructor(props) {
    super();
    this.state = {
        pageShowing: 'bestiary',
        bestiarySearchValue: ""
    };
    this.actualAreaMonsters = this.actualAreaMonsters.bind(this);
  }

  componentDidMount() {
    this.props.cargarPersonajes();
  }

  actualAreaMonsters() {
    try {
        let areaActuaList = this.props.areaActual.extData.monsters;
        let bestiario = this.props.bestiario;
        var unifiedList = [];
        for (let i = 0; i < areaActuaList.length; i++) {
            let coincidence = bestiario.filter(monster => monster.nombre === areaActuaList[i]);
            unifiedList = unifiedList.concat(coincidence);
        }
        return unifiedList;
    } catch (e) {
        return [];
    }
  }

  render() {
    let bestiario = this.props.bestiario;
    let filteredBestiario = bestiario.filter(monstruo => monstruo.nombre.toLowerCase().includes(this.state.bestiarySearchValue))
    if (this.props.mostrarSeleccion) {
        return (
            <div id="detallesContainer" className="flex fill relative">
                <div className={this.props.datosSeleccion.color + " contentTitleBox"}>
                    <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
                    onClick={()=> {this.props.ocultarDetalles()}}>
                        ⬑
                    </div>
                    <div className="contentTitleBoxTitle">{this.props.datosSeleccion.entidad.nombre}</div>
                </div>
                <div className="listBoxing">
                    <ShareableWindow
                        titulo={this.props.datosSeleccion.entidad.nombre}
                        color={this.props.datosSeleccion.color}
                        renderData={this.props.datosSeleccion.entidad.sheet
                            ? {data: this.props.datosSeleccion.entidad.sheet, type: "img"}
                            : {data: this.props.datosSeleccion.entidad, type: "json"}}
                    />
                </div>
            </div>
        )
    }

    return (
      <div id="personajesContainer" className="flex fill">
        <div id="buttonRow" className="buttonRow">
            <div className="flex1 tabButton redish hoverPoint" onClick={()=> this.setState({pageShowing: "bestiary"})}>Bestiario</div>
            <div className="flex1 tabButton greenish hoverPoint" onClick={()=> this.setState({pageShowing: "pcs"})}>Jugadores</div>
            <div className="flex1 tabButton colorMapa hoverPoint" onClick={()=> this.setState({pageShowing: "area"})}>Area Actual</div>
        </div>

        {(() => {
            switch(this.state.pageShowing) {
            case 'bestiary':
                return (
                    <div className="fill">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {filteredBestiario.map((monstruo, index)=>
                                <div key={'monstruoList' + monstruo.nombre + index} className="redish contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(monstruo, "redish")}>
                                        {monstruo.nombre}
                                    </div>
                                    <div className="botonAmpliar hoverPoint clickFeedback yellowish"
                                        onClick={()=>this.props.agregarAListaDeTurnos(monstruo)}>
                                        ➜
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
                );
            case 'pcs':
                return (
                    <div className="fill">
                        <div className="listBoxing personajesListContainer">
                            {this.props.pcs.map((personaje, index)=> 
                                <div key={'monstruoList' + personaje.nombre + index} className="greenish contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(personaje, "greenish")}>
                                        {personaje.nombre}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'area':
                return (
                    <div className="fill">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {this.actualAreaMonsters().map((monstruo, index)=>
                                <div key={'monstruoOfAreaList' + monstruo.nombre + index} className="colorMapa contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(monstruo, "redish")}>
                                        {monstruo.nombre}
                                    </div>
                                    <div className="botonAmpliar hoverPoint clickFeedback yellowish"
                                        onClick={()=>this.props.agregarAListaDeTurnos(monstruo)}>
                                        ➜
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            default:
                return null;
            }
        })()}
      </div>
    );
  }
}
