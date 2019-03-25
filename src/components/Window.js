import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';

class Window extends React.Component {

  constructor(props) {
    super();
    this.content = this.content.bind(this);
  }

  content() {
    return (
      <div className={this.props.modoCombate ? "sangron paper windowBox" : "colorMapa paper windowBox"}>
        <p className="boxTitle">{this.props.title}</p>
        <div id="windowChildrenContainer" className="fill relative">
          {this.props.children}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className={this.props.modoCombate ? "sangron paper windowBox flex" : "colorMapa paper windowBox flex"}>
        <div className="botonAmpliar hoverPoint clickFeedback greenish" onClick={()=>this.props.ampliar(this.content())}>⬆</div>
        <div className="boxTitle">
          {this.props.title}
        </div>
        <div id="windowChildrenContainer" className="flex1 relative">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modoCombate: state.main.modoCombate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ampliar: (content) => dispatch(mainActions.ampliar(content))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);