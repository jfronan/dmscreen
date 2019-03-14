import React from 'react';
import '../../App.css';
import './MapScreen.css';
import Window from '../Window';

export default class MapScreen extends React.Component {

  constructor(props) {
    super();
    this.imagenAMostrar = this.imagenAMostrar.bind(this);
  }

  imagenAMostrar() {
    return './images/locations' + this.props.mapa;
  }

  contentMapa() {
      return (
        <div id="mapArea" className="flex cartografoContainer fill">
          <img src={this.imagenAMostrar()} alt='No se encuentra imagen' className="mapImage" align="middle"/>
        </div>
      )
  }

  render() {
    return (
      <div className="App">
        <div id="npc" className="windowContainer npcWindow">
          <Window title="NPCs">
          </Window>
        </div>
        <div id="notas" className="windowContainer notasWindow">
          <Window title="Notas">
          </Window>
        </div>
        <div id="notaArea" className="windowContainer notaAreaWindow">
          <Window title="Notas del area">
          </Window>
        </div>
        <div id="navigator" className="windowContainer navigator">
          <Window title="Explorador">
          </Window>
        </div>
        <div id="logger" className="windowContainer loggerWindow">
          <Window title="Log">
          </Window>
        </div>

        <div id="mapArea" className="colorMapa flex cartografoBox cartografoContainer">
          <img src={this.imagenAMostrar()}
            alt='No se encuentra imagen'
            className="mapImage hoverPoint"
            align="middle"
            onClick={()=> this.props.ampliar(this.contentMapa())}
          />
        </div>
      </div>
    );
  }
}
