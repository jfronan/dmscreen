import React from 'react';
import ShareableWindow from '../../ShareableWindow';
import '../../../App.css';
import { capitalizeWord } from '../../../utils/Utils';

export default class Npcs extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let mostrarDetalles = (this.props.urlDetallesNPC !== '') && (this.props.mostrandoDatos)
    if (!mostrarDetalles) {
      return (
        <div className="fill">
          {this.props.actualTreePath.extData
            ? this.props.actualTreePath.extData.npcs.map((npcTitle) => 
            <div className="yellowish contentTitleBox hoverPoint">
              <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetallesNPC(npcTitle)}>
                {capitalizeWord(npcTitle)}
              </div>
            </div>
          )
          : null}
        </div>
      )
    }
    if (mostrarDetalles) {
        console.log(this.props.urlDetallesNPC);
      return (
        <ShareableWindow titulo={capitalizeWord(this.props.nombreDetalleNPC)} color="yellowish">
            <div className="yellowish contentTitleBox">
              <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
                onClick={()=> {this.props.ocultarDetallesNPC()}}>
                  ⬑
              </div>
              <div className="contentTitleBoxTitle">{capitalizeWord(this.props.nombreDetalleNPC)}</div>
            </div>
            <iframe id="iframe" className="fill" src={this.props.urlDetallesNPC} seamless/>
        </ShareableWindow>
        );
    }
    return null;
  }
}
