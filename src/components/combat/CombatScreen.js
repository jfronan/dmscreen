import React from 'react';
import '../../App.css';
import './CombatScreen.css';
import Window from '../Window';

export default class CombatScreen extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App">
        <div id="personajes" className="windowContainer pjWindow">
          <Window title="Personajes">
          </Window>
        </div>
        <div id="hechizos" className="windowContainer hechizosWindow">
          <Window title="Hechizos">
          </Window>
        </div>
        <div id="turnos" className="windowContainer turnosWindow">
          <Window title="Turnos">
          </Window>
        </div>
      </div>
    );
  }
}
