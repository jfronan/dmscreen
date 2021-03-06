import React from 'react';
import { connect } from 'react-redux';
import * as mainActions from '../actions/MainScreenAction';
import { renderIframe } from '../utils/Utils';
import {PERSONAJES, HECHIZOS} from '../Constants';
import PcCard from './combat/personajes/PcCard';
var fs = window.require('fs');

function binaryRead(url){
  if (url !== '') {
    var urlContent = fs.readFileSync(url);
    return 'data:image/png;base64,' + urlContent.toString('base64');
  }
}

class ShareableWindow extends React.Component {

    constructor(props) {
      super();
      this.renderContent = this.renderContent.bind(this);
    }

    renderContent() {
      switch (this.props.renderData.type) {
        case 'iframe':
        return (
          renderIframe(this.props.renderData.data, "fill listBoxing")
        )
        case 'imgBestiary':
        return (
          <img src={binaryRead(PERSONAJES + '/statSheets/' + this.props.renderData.data)}
          alt='No se encuentra imagen'
          className="mapImage"
          align="middle"
          />
        )
        case 'imgHechizo':
        return (
          <img src={binaryRead(HECHIZOS + '/' + this.props.renderData.data)}
          alt='No se encuentra imagen'
          className="mapImage"
          align="middle"
          />
        )
        case 'json':
        return (
          <PcCard data={this.props.renderData.data}/>
        )

        default: return null;
      }
    }
  
    render() {
      return (
        <div className="fill">
          <div
            className="botonAnotar hoverPoint clickFeedback"
            onClick={()=>this.props.anotar(this.props.titulo, this.props.color, this.props.renderData)}>
                &#128214;
          </div>
          <div id="windowChildrenContainer" className="listBoxing shareableContentBoxing">
            {this.renderContent()}
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





