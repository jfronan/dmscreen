import React from 'react';
import '../../App.css';
import './MapScreen.css';
import Window from '../Window';
import Navegador from './navegador/NavegadorContainer';
import NPCs from './npcs/NpcsContainer';

export default class MapScreen extends React.Component {

  constructor(props) {
    super();
    this.imagenAMostrar = this.imagenAMostrar.bind(this);
  }

  imagenAMostrar() {
    return this.props.mapa;
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
            <NPCs/>
          </Window>
        </div>
        <div id="navigator" className="windowContainer navigator">
          <Window title="Explorador">
            <Navegador/>
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