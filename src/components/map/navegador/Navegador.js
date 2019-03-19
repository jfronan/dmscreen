import React from 'react';
import '../../../App.css';
import './Navegador.css';
import { capitalizeWord } from '../../../utils/Utils';

export default class Navegador extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.cargarArbol();
  }

  render() {
    return (
      <div className="flex fill">
        <div id="navigatorLocationTitle" className="springreen contentTitleBox">
          <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
            onClick={()=> {this.props.goBackToParent()}}>
            ⬑
          </div>
          <div className="contentTitleBoxTitle">{capitalizeWord(this.props.actualTreePath.name)}</div>
        </div>
        <div id="subLocsContainer" className="subLocContainer scroll">
        {this.props.actualTreePath.subLocs
            ? this.props.actualTreePath.subLocs.map((subLoc, index) => 
                <div className="subLocBox hoverPoint" onClick={()=> {this.props.goToSubLoc(index)}}>
                    <div className="subLocTitle">→ {capitalizeWord(subLoc.name)}</div>
                </div>
            )
            : null}
        </div>
      </div>
    );
  }
}
