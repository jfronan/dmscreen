import React from 'react';
import Window from '../Window';
import Personajes from './personajes/PersonajesContainer';

export default class CombatScreen extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="App">
        <div id="personajes" className="windowContainer pjWindow">
          <Window title="Personajes">
            <Personajes/>
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
