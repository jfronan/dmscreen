import React from 'react';
import {capitalizeWord} from '../../../utils/Utils';

export default class Editor extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16 relative">
                    <div className="fill relative">
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
                                <div key={"locacion" + subLoc.name + index} className="subLocBox hoverPoint" onClick={()=> {this.props.goToSubLoc(index)}}>
                                    <div className="subLocTitle">→ {capitalizeWord(subLoc.name)}</div>
                                </div>
                            )
                            : null}
                        </div>
                        <div className="gearConfirmLocation colorMapa">
                            {capitalizeWord(this.props.actualTreePath.name) !== 'Locations'
                                ? 'Se editara "' + capitalizeWord(this.props.actualTreePath.name) + '"'
                                : 'No se puede editar Locations'
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
