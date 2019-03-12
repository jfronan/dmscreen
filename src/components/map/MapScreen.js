import React from 'react';
import '../../App.css';
import './MapScreen.css';
import Window from '../Window';

export default class MapScreen extends React.Component {

  constructor(props) {
    super();
    this.onAlternarPress = this.onAlternarPress.bind(this);
    this.imagenAMostrar = this.imagenAMostrar.bind(this);
  }

  onAlternarPress() {
    this.props.alternarCombateMapa();
  }

  imagenAMostrar() {
    return process.env.PUBLIC_URL + '/images/locations/city.jpg';
  }

  contentMapa() {
      return (
        <div id="mapArea" className="flex cartografoContainer fill">
          <img src={this.imagenAMostrar()} alt='Fallo la carga :(' className="mapImage" align="middle"/>
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
            alt='Fallo la carga :('
            className="mapImage hoverPoint"
            align="middle"
            onClick={()=> this.props.ampliar(this.contentMapa())}
          />
        </div>
      </div>
    );
  }
}
