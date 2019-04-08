import React from 'react';
import '../App.css';
import mapPage from "../assets/mapPage.png";
import combatPage from "../assets/combatPage.png";
import settingsIcon from "../assets/settingsIcon.png";

import MapScreen from "./map/MapScreenContainer";
import CombatScreen from "./combat/CombatScreenContainer";
import ModalZoom from "./ModalZoomContainer";
import Window from "./Window";
import LogWindow from "./logger/LogWindowContainer";
import NotasArea from './notasArea/NotasAreaContainer';
import Notas from './notas/NotasContainer';

import { SERVER } from '../Constants';

export default class MainScreen extends React.Component {

  constructor(props) {
    super();
    this.onAlternarPress = this.onAlternarPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => {
      var data = {
        logs: this.props.logs
      };
      ev.preventDefault();
      fetch(SERVER + "cerrarApp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
    });
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
        <div id='combate' className={this.props.modoCombate ? 'App sangron' : 'hidden'}>
          <CombatScreen/>
        </div>

        <div id="notas" className={this.props.modoCombate ? "windowContainer notasWindowCombat" : "windowContainer notasWindowMap"}>
          <Window title="Notas">
            <Notas/>
          </Window>
        </div>
        <div id="notaArea" className={this.props.modoCombate ? "windowContainer notaAreaWindowCombat" : "windowContainer notaAreaWindowMap"}>
          <Window title="Notas del area">
            <NotasArea/>
          </Window>
        </div>
        <div id="logger" className={this.props.modoCombate ? "windowContainer loggerWindowCombat" : "windowContainer loggerWindowMap"}>
          <Window title="Log">
            <LogWindow/>
          </Window>
        </div>
      </div>
    );
  }
}
