import React from 'react';
import { capitalizeWord } from '../../../utils/Utils';

export default class Turnos extends React.Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.cargarArbol();
  }

  render() {
    return (
      <div id="turnosContainer" className="flex fill">
        {this.props.actualTreePath.subLocs
            ? this.props.actualTreePath.subLocs.map((subLoc, index) => 
                <div className="subLocBox hoverPoint" onClick={()=> {this.props.goToSubLoc(index)}}>
                    <div className="subLocTitle">→ {capitalizeWord(subLoc.name)}</div>
                </div>
            )
            : null}
      </div>
    );
  }
}
