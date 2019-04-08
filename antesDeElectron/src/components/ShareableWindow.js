import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';

class ShareableWindow extends React.Component {

    constructor(props) {
      super();
      this.content = this.content.bind(this);
    }
  
    content() {
      return (
        <div className="listBoxing shareableContentBoxing">
          {this.props.children}
        </div>
      )
    }
  
    render() {
      return (
        <div className="fill flex">
          <div
            className="botonAnotar hoverPoint clickFeedback"
            onClick={()=>this.props.anotar(this.props.titulo, this.props.color, this.content())}>
                &#128214;
          </div>
          <div id="windowChildrenContainer" className="listBoxing shareableContentBoxing">
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
      anotar: (titulo, color, content) => dispatch(mainActions.anotar(titulo, color, content))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ShareableWindow);





