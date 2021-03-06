import React from 'react';
import ShareableWindow from '../../ShareableWindow';
import { capitalizeWord, renderIframe } from '../../../utils/Utils';

export default class Npcs extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    let mostrarDetalles = (this.props.urlDetallesNPC !== '') && (this.props.mostrandoDatos)
    if (!mostrarDetalles) {
      return (
        <div className="fill">
          <div className="listBoxing">
            {this.props.actualTreePath.extData
              ? this.props.actualTreePath.extData.npcs.map((npcTitle, index) => 
              <div key={"npc" + npcTitle + index} className="yellowish contentTitleBox hoverPoint">
                <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetallesNPC(npcTitle)}>
                  {capitalizeWord(npcTitle)}
                </div>
              </div>
            )
            : null}
          </div>
        </div>
      )
    }
    if (mostrarDetalles) {
      return (
        <div className="fill flex relative">
          <div className="yellowish contentTitleBox">
            <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
              onClick={()=> {this.props.ocultarDetallesNPC()}}>
                ⬑
            </div>
            <div className="contentTitleBoxTitle">{capitalizeWord(this.props.nombreDetalleNPC)}</div>
          </div>
          <div className="listBoxing">
            <ShareableWindow titulo={capitalizeWord(this.props.nombreDetalleNPC)} color="yellowish" renderData={{data: this.props.urlDetallesNPC, type: "iframe"}}/>
          </div>
        </div>
      );
    }
    return null;
  }
}
