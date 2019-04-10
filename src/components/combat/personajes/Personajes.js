import React from 'react';
import { capitalizeWord } from '../../../utils/Utils';
import {PERSONAJES} from '../../../Constants';
import ShareableWindow from '../../ShareableWindow';

export default class Personajes extends React.Component {

  constructor(props) {
    super();
    this.state = {
        pageShowing: 'bestiary'
    };
    this.renderMonstruo = this.renderMonstruo.bind(this);
    this.renderPersonaje = this.renderPersonaje.bind(this);
  }

  componentDidMount() {
    this.props.cargarPersonajes();
  }

  renderMonstruo(sheetName) {
      console.log(PERSONAJES + '/statSheets/' + sheetName);
    return (
        <img src={PERSONAJES + '/statSheets/' + sheetName}
        alt='No se encuentra imagen'
        className="mapImage"
        align="middle"
        />
    )
  }
  renderPersonaje(pjJson) {
    return (
        <div>En construc</div>
    )
  }

  render() {
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
                    <ShareableWindow titulo={this.props.datosSeleccion.entidad.nombre} color={this.props.datosSeleccion.color}>
                        {this.props.datosSeleccion.entidad.sheet ? this.renderMonstruo(this.props.datosSeleccion.entidad.sheet) : this.renderPersonaje(this.props.datosSeleccion.entidad)}
                    </ShareableWindow>
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
                            {this.props.bestiario.map((monstruo, index)=> 
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
                            <input id="searchBar" type="text" className="searchBar" placeholder="Buscar Monstruo"/>
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
                return (<div className="fill">En construccion</div>);
            default:
                return null;
            }
        })()}
      </div>
    );
  }
}
