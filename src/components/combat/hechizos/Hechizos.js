import React from 'react';
import ShareableWindow from '../../ShareableWindow';

export default class Hechizos extends React.Component {

  constructor(props) {
    super();
    this.state = {
        pageShowing: 'hechizos',
        hechizosSearchValue: ""
    };
    this.actualSelectionSpells = this.actualSelectionSpells.bind(this);
  }

  componentDidMount() {
    this.props.cargarHechizos();
  }

  actualSelectionSpells() {
    try {
        var turnoList = this.props.listaDeTurnos;
        var pjSelecHechizos = (this.props.pjDeListaActual.spells ? this.props.pjDeListaActual.spells : []);
        let hechizos = this.props.hechizos;
        var unifiedList = [];
        for (let i = 0; i < turnoList.length; i++) {
            if (turnoList[i].entidad.spells) {
                for (let j = 0; j < turnoList[i].entidad.spells.length; j++) {
                    let coincidence = hechizos.filter(hechizo => hechizo.nombre === turnoList[i].entidad.spells[j]);
                    if (coincidence[0] && (unifiedList.length < 1 || unifiedList.filter((unifiedRes)=> unifiedRes.nombre === coincidence[0].nombre).length < 1)) {
                        unifiedList = unifiedList.concat(coincidence);
                    }
                }
            }
        }
        for (let i = 0; i < pjSelecHechizos.length; i++) {
            let coincidence = hechizos.filter(hechizo => hechizo.nombre === pjSelecHechizos[i]);
            if (coincidence[0] && (unifiedList.length < 1 || unifiedList.filter((unifiedRes)=> unifiedRes.nombre === coincidence[0].nombre).length < 1)) {
                unifiedList = unifiedList.concat(coincidence);
            }
        }
        return unifiedList;
    } catch (e) {
        console.log(e);
        return [{nombre: "algo se rompio =("}];
    }
  }

  render() {
    let hechizos = this.props.hechizos;
    let filteredHechizos = hechizos.filter(hechizo => hechizo.nombre.toLowerCase().includes(this.state.hechizosSearchValue))
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
                        renderData={{data: this.props.datosSeleccion.entidad.sheet, type: "imgHechizo"}}
                    />
                </div>
            </div>
        )
    }

    return (
      <div id="personajesContainer" className="flex fill">
        <div id="buttonRow" className="buttonRow">
            <div className="flex1 tabButton violet hoverPoint" onClick={()=> this.setState({pageShowing: "hechizos"})}>Hechizos</div>
            <div className="flex1 tabButton colorMapa hoverPoint" onClick={()=> this.setState({pageShowing: "presentes"})}>Hechizos Presentes</div>
        </div>

        {(() => {
            switch(this.state.pageShowing) {
            case 'hechizos':
                return (
                    <div className="fill">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {filteredHechizos.map((hechizo, index)=>
                                <div key={'hechizoList' + hechizo.nombre + index} className="violet contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(hechizo, "violet")}>
                                        {hechizo.nombre}
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
                );
            case 'presentes':
                return (
                    <div className="fill">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {this.actualSelectionSpells().map((hechizo, index)=>
                                <div key={'hechizosPresentesList' + hechizo.nombre + index} className="colorMapa contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(hechizo, "violet")}>
                                        {hechizo.nombre}
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
