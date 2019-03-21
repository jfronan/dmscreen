import React from 'react';
import '../App.css';
import mapPage from "../assets/mapPage.png";
import combatPage from "../assets/combatPage.png";
import settingsIcon from "../assets/settingsIcon.png";

import MapScreen from "./map/MapScreenContainer";
import ModalZoom from "./ModalZoomContainer";
import Window from "./Window";

export default class MainScreen extends React.Component {

  constructor(props) {
    super();
    this.onAlternarPress = this.onAlternarPress.bind(this);
  }

  onAlternarPress() {
    this.props.alternarCombateMapa();
  }

  render() {
    return (
      <div className="App">
        <ModalZoom/>
        <div className="opcionesBox">
          <div id="mainAlternador" onClick={this.onAlternarPress} className="button opcionesButton clickFeedback yellowish">
            {this.props.modoCombate
            ? <img src={mapPage} className="roundImages" alt="Go to Map" title="Go to Map"/>
            : <img src={combatPage} className="roundImages" alt="Go to Combat" title="Go to Combat"/>
            }
          </div>
          <div id="opciones" className="button opcionesButton clickFeedback greyish">
            <img src={settingsIcon} className="roundImages" alt="Opciones"/>
          </div>
        </div>

        <div id='mapa' className={this.props.modoCombate ? 'hidden' : 'App colorMapa'}>
          <MapScreen/>
        </div>
        <div id='combate' className={this.props.modoCombate ? 'App sangron' : 'hidden'}>Combate (WIP)</div>

        <div id="logger" className={this.props.modoCombate ? "windowContainer loggerWindowCombat" : "windowContainer loggerWindowMap"}>
          <Window title="Log">
          </Window>
        </div>
      </div>
    );
  }
}
