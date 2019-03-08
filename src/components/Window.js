import React from 'react';
import '../App.css';

export default class Window extends React.Component {

  constructor(props) {
    super();
    this.onAlternarPress = this.onAlternarPress.bind(this);
  }

  onAlternarPress() {
    this.props.alternarCombateMapa();
  }

  render() {
    return (
      <div className="celestito windowBox">
        <p className="boxTitle">{this.props.title}</p>
      </div>
    );
  }
}
