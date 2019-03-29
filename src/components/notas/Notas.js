import React from 'react';
import '../../App.css';
import { capitalizeWord } from '../../utils/Utils';

export default class Notas extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    if (typeof this.props.mostrandoNota !== 'number') {
      return (
        <div className="fill">
          <div className="listBoxing">
            {this.props.contenidoNotas.map((nota, index) => 
              <div className={nota.color + " contentTitleBox hoverPoint"}>
                <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarNota(index)}>
                  {capitalizeWord(nota.titulo)}
                </div>
                <div className="botonAmpliar hoverPoint clickFeedback redish"
                onClick={()=>this.props.eliminarNota(index)}>
                  X
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
    return (
      <div className="fill">
        <div className={this.props.contenidoNotas[this.props.mostrandoNota].color + " contentTitleBox"}>
            <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
            onClick={()=> {this.props.ocultarNota()}}>
                ⬑
            </div>
            <div className="contentTitleBoxTitle">{capitalizeWord(this.props.contenidoNotas[this.props.mostrandoNota].titulo)}</div>
        </div>
        {this.props.contenidoNotas[this.props.mostrandoNota].content}
      </div>
    );
  }
}
