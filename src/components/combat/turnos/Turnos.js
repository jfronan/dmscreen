import React from 'react';
import TurnoRow from './TurnoRow';

export default class Turnos extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    var trueListaTurnos = this.props.listaTurnos;
    var listaDeTurnosIndexada = [];
    var listaDeTurnosVisible = [];
    listaDeTurnosIndexada = trueListaTurnos.map((turno, index)=> {
      return {init: turno.floatingStats.init, realIndex: index};
    })
    
    listaDeTurnosVisible = listaDeTurnosIndexada.sort((a, b) => {
      if (b.init !== a.init) {
        return (b.init - a.init);
      } else {
        return (a.realIndex - b.realIndex);
      }
    });

    return (
      <div id="turnosContainer" className="flex fill">
        <div className="listBoxing">
          <div className="yellowish contentTitleBox relative">
            <div className="relative">
              <div className="hpTextInput">HP</div>
              <div className="acTextInput">AC</div>
              <div className="initTextInput">Ini</div>
            </div>
          </div>
          {listaDeTurnosVisible.map((participante, index) =>
            <TurnoRow key={("participante" + participante.realIndex) + index}
              turnoData={trueListaTurnos[participante.realIndex]}
              changeStat={(statKey, value) => {this.props.modifyEntityValue(participante.realIndex, statKey, value); this.forceUpdate()}}
              removeFromList={()=> this.props.removeFromList(participante.realIndex)}
              mostrarDetalles={()=> this.props.mostrarDetalles(trueListaTurnos[participante.realIndex].entidad, trueListaTurnos[participante.realIndex].color)}
            />
          )}
        </div>
      </div>
    );
  }
}
