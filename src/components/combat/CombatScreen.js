import React from 'react';
import Window from '../Window';
import Personajes from './personajes/PersonajesContainer';
import Turnos from './turnos/TurnosContainer';
import Hechizos from './hechizos/HechizosContainer';

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
            <Hechizos/>
          </Window>
        </div>
        <div id="turnos" className="windowContainer turnosWindow">
          <Window title="Turnos">
            <Turnos/>
          </Window>
        </div>
      </div>
    );
  }
}
