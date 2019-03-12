import React from 'react';
import '../App.css';

export default class ModalZoom extends React.Component {

  constructor(props) {
    super();
    this.escFunction = this.escFunction.bind(this);
  }
  escFunction(event) {
    if(event.keyCode === 27) {
      this.props.cerrarModal()
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    if (this.props.modalZoomAbierto && (this.props.contenidoModalZoom !== null)) {
        return (
        <div className="modalContainer" onClick={()=>this.props.cerrarModal()}>
            <div className="modalBox" onClick={(e)=>{e.stopPropagation()}}>
                {this.props.contenidoModalZoom}
                <div className="botonAmpliar botonCerrar redish" onClick={()=>this.props.cerrarModal()}>X</div>
            </div>
        </div>
        );
    } else {
        return null;
    }
  }
}
