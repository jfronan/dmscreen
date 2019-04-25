import React from 'react';
import EditorGear from './gearEditor/EditorGearContainer';

export default class GearModal extends React.Component {

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
    if (this.props.modalAbierto) {
        return (
        <div className="modalContainer" onClick={()=>this.props.cerrarModal()}>
            <div className="modalBox gear" onClick={(e)=>{e.stopPropagation()}}>
              {this.props.showingScreen === ''
                ? <div className="fill flexRow spaced">
                  <div className="flex1 flex spaceAround">
                    <div className="gearButtons gear flex violet hoverPoint clickFeedback">
                      <div>Manual de Uso</div>
                    </div>
                    <div className="gearButtons gear flex violet hoverPoint clickFeedback">
                      <div>Borrar Logs</div>
                    </div>
                  </div>
                  <div className="flex1 flex spaceAround">
                    <div className="gearButtons gear flex violet">
                      <div className="flex1">Hechizos</div>
                      <div className="flex1 flexRow spaced fullwidth">
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback borderRight" onClick={()=> this.props.goToAddMagic()}>Agregar</div>
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback" onClick={()=> this.props.goToEditMagic()}>Editar</div>
                      </div>
                    </div>
                    <div className="gearButtons gear flex violet">
                      <div className="flex1">Bestiario</div>
                      <div className="flex1 flexRow spaced fullwidth">
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback borderRight" onClick={()=> this.props.goToAddBeast()}>Agregar</div>
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback" onClick={()=> this.props.goToEditBeast()}>Editar</div>
                      </div>
                    </div>
                    <div className="gearButtons gear flex violet">
                      <div className="flex1">PCs</div>
                      <div className="flex1 flexRow spaced fullwidth">
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback borderRight" onClick={()=> this.props.goToAddPc()}>Agregar</div>
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback" onClick={()=> this.props.goToEditPc()}>Editar</div>
                      </div>
                    </div>
                    <div className="gearButtons gear flex violet">
                      <div className="flex1">NPCs</div>
                      <div className="flex1 flexRow spaced fullwidth">
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback borderRight" onClick={()=> this.props.goToAddNpc()}>Agregar</div>
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback" onClick={()=> this.props.goToEditNpc()}>Editar</div>
                      </div>
                    </div>
                    <div className="gearButtons gear flex violet">
                      <div className="flex1">Locations</div>
                      <div className="flex1 flexRow spaced fullwidth">
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback borderRight" onClick={()=> this.props.goToAddLocation()}>Agregar</div>
                        <div className="flex1 gearSubButtons hoverPoint clickFeedback" onClick={()=> this.props.goToEditLocation()}>Editar</div>
                      </div>
                    </div>
                  </div>
                </div>
              : <EditorGear />}
              <div className="botonAmpliar botonCerrar hoverPoint clickFeedback redish" onClick={()=>this.props.cerrarModal()}>X</div>
            </div>
        </div>
        );
    } else {
        return null;
    }
  }
}
