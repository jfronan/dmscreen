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
      <div className="colorMapa windowBox">
        <p className="boxTitle">{this.props.title}</p>
        <div id="windowChildrenContainer" className="fill">
          {this.props.children}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="colorMapa windowBox">
        <div className="botonAmpliar greenish" onClick={()=>this.props.ampliar(this.content())}>⬆</div>
        <div className="boxTitle">
          {this.props.title}
        </div>
        <div id="windowChildrenContainer" className="fill">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ampliar: (content) => dispatch(mainActions.ampliar(content))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Window);