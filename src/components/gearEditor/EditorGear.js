import React from 'react';
import SpellAdder from './spellEditor/AdderContainer';
import SpellEditor from './spellEditor/EditorContainer';

export default class GearModal extends React.Component {

  constructor(props) {
    super();
    this.renderConfirmation = this.renderConfirmation.bind(this);
    this.confirmFunction = this.confirmFunction.bind(this);
  }

  confirmFunction(show) {
      switch (show) {
        case "agregarHechizos":
        this.props.guardarHechizo()
        break;
        case "editarHechizos":
        this.props.editarHechizo()
        break;

        default: break;
      }
  }

  renderConfirmation(){
    let show = this.props.showingScreen;
    if (show.startsWith("agregar")) {
        if (this.props.actualFormIsComplete) {
            return (
                <div className="flex1 flex centerContent">
                    <div className="gearConfirmEnabledButton hoverPoint clickFeedback" onClick={()=> this.confirmFunction(show)}>
                        Guardar
                    </div>
                </div>
            )
        }
        return (
            <div className="flex1 flex centerContent">
                <div className="gearConfirmDisabledButton">
                    Guardar
                </div>
            </div>
        )
    }
    if (show.startsWith("editar")) {
        if (Object.keys(this.props.editSelected).length > 0 && this.props.editSelected.constructor === Object) {
            return (
                <div className="flex1 flex centerContent">
                    <div className="gearConfirmEnabledButton hoverPoint clickFeedback" onClick={()=> this.confirmFunction(show)}>
                        Editar
                    </div>
                </div>
            )
        }
        return (
            <div className="flex1 flex centerContent">
                <div className="gearConfirmDisabledButton">
                    Editar
                </div>
            </div>
        )
    }
  }

  render() {
    return (
        <div className="fill flex relative">
            {(()=> {
                switch (this.props.showingScreen) {
                    case "agregarHechizos":
                    return <SpellAdder/>;
                    case "editarHechizos":
                    return <SpellEditor/>;

                    default: return null;
                }
            })()}
            <div className="gearFooter flexRow spaced">
                <div className="flex1 flex centerContent">
                    <div className="gearBackButton hoverPoint clickFeedback" onClick={()=> this.props.returnToGearMenu()}>
                        Volver
                    </div>
                </div>
                {this.renderConfirmation()}
            </div>
        </div>
    );
  }
}
