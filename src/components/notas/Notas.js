import React from 'react';
import { capitalizeWord } from '../../utils/Utils';
import { renderIframe } from '../../utils/Utils';
import {PERSONAJES} from '../../Constants';
import PcCard from '../combat/personajes/PcCard';

export default class Notas extends React.Component {

  constructor(props) {
    super();
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidMount() {
    this.props.traerNotasGuardadas();
  }

  renderContent(renderData) {
    switch (renderData.type) {
      case 'iframe':
      return (
        renderIframe(renderData.data, "fill listBoxing")
      )
      case 'img':
      return (
        <img src={PERSONAJES + '/statSheets/' + renderData.data}
        alt='No se encuentra imagen'
        className="mapImage"
        align="middle"
        />
      )
      case 'json':
      return (
        <PcCard data={renderData.data}/>
      )

      default: return null;
    }
  }

  render() {
    if (typeof this.props.mostrandoNota !== 'number') {
      return (
        <div className="fill">
          <div className="listBoxing">
            {this.props.contenidoNotas.map((nota, index) => 
              <div key={"nota" + nota.titulo + index} className={nota.color + " contentTitleBox hoverPoint"}>
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
        <div className="listBoxing shareableContentBoxing">
          {this.renderContent(this.props.contenidoNotas[this.props.mostrandoNota].content)}
        </div>
      </div>
    );
  }
}
