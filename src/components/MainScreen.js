import React from 'react';

import MapScreen from "./map/MapScreenContainer";
import CombatScreen from "./combat/CombatScreenContainer";
import ModalZoom from "./ModalZoomContainer";
import GearModal from "./GearModalContainer";
import Window from "./Window";
import LogWindow from "./logger/LogWindowContainer";
import NotasArea from './notasArea/NotasAreaContainer';
import Notas from './notas/NotasContainer';

import {storeLogs, storeNotes} from '../dataMiddleware';
var fs = window.require('fs');

function binaryRead(url){
  if (url !== '') {
    var urlContent = fs.readFileSync(url);
    return 'data:image/png;base64,' + urlContent.toString('base64');
  }
}

const remote = require('electron').remote

export default class MainScreen extends React.Component {

  constructor(props) {
    super();
    this.onAlternarPress = this.onAlternarPress.bind(this);
    this.closeApp = this.closeApp.bind(this);
  }

  closeApp() {
    let w = remote.getCurrentWindow()
    w.close()
  }

  componentDidMount() {
    window.addEventListener("beforeunload", (ev) => {
      var data = {
        logs: this.props.logs
      };
      var notasAGuardar = {
        notes: this.props.notes
      }
      ev.preventDefault();
      storeLogs(data);
      storeNotes(notasAGuardar);
    });
  }

  onAlternarPress() {
    this.props.alternarCombateMapa();
  }

  render() {
    return (
      <div className="App">
        <div className="closeAppButton hoverPoint clickFeedback" onClick={()=> this.closeApp()}>X</div>
        <ModalZoom/>
        <GearModal/>
        <div className="opcionesBox">
          <div id="mainAlternador" onClick={this.onAlternarPress} className="button opcionesButton clickFeedback yellowish">
            {this.props.modoCombate
            ? <img src={"./assets/mapPage.png"} className="roundImages" alt="Go to Map" title="Go to Map"/>
            : <img src={"./assets/combatPage.png"} className="roundImages" alt="Go to Combat" title="Go to Combat"/>
            }
          </div>
          <div id="opciones" className="button opcionesButton clickFeedback greyish" onClick={()=> this.props.abrirModalConfig()}>
            <img src={"./assets/settingsIcon.png"} className="roundImages" alt="Opciones"/>
          </div>
        </div>

        <div id='mapa' className={this.props.modoCombate ? 'hidden' : 'App colorMapa'}>
          <img src={!this.props.mapaImg.startsWith('data:') ? binaryRead(this.props.mapaImg) : this.props.mapaImg} alt="" className="App blur"/>
          <MapScreen/>
        </div>
        <div id='combate' className={this.props.modoCombate ? 'App sangron' : 'hidden'}>
          <img src={!this.props.mapaImg.startsWith('data:') ? binaryRead(this.props.mapaImg) : this.props.mapaImg} alt="" className="App blur"/>
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
