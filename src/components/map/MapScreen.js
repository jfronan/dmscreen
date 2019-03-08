import React from 'react';
import '../../App.css';
import './MapScreen.css';
import Window from '../Window';

export default class MapScreen extends React.Component {

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
        <div id="logger" className="windowContainer loggerWindow">
          <Window title="Log">
          </Window>
        </div>
      </div>
    );
  }
}
