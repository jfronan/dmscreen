import React from 'react';
import '../../App.css';
import './Navegador.css';

export default class Navegador extends React.Component {

  constructor(props) {
    super();
    this.imagenAMostrar = this.imagenAMostrar.bind(this);
  }

  componentDidMount() {
    this.props.cargarArbol();
  }

  imagenAMostrar() {
    return process.env.PUBLIC_URL + '/images/locations' + this.props.mapa;
  }

  render() {
    return (
      <div className="App">
        <div id="npc" className="windowContainer npcWindow">
        </div>

        <div id="mapArea" className="colorMapa flex cartografoBox cartografoContainer">
          <img src={this.imagenAMostrar()}
            alt='No se encuentra imagen'
            className="mapImage hoverPoint"
            align="middle"
          />
        </div>
      </div>
    );
  }
}
