import React from 'react';
import SpellAdder from './spellEditor/AdderContainer';
import SpellEditor from './spellEditor/EditorContainer';
import BestiaryAdder from './bestiaryEditor/AdderContainer';
import BestiaryEditor from './bestiaryEditor/EditorContainer';
import CharacterAdder from './characterEditor/AdderContainer';
import CharacterEditor from './characterEditor/EditorContainer';
import NPCAdder from './npcEditor/AdderContainer';
import NPCEditor from './npcEditor/EditorContainer';
import LocacionAdder from './locationEditor/AdderContainer';
import LocacionEditor from './locationEditor/EditorContainer';

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
        case "agregarMonstruo":
        this.props.guardarMonstruo()
        break;
        case "editarMonstruo":
        this.props.editarMonstruo()
        break;
        case "agregarPersonaje":
        this.props.guardarPersonaje()
        break;
        case "editarPersonaje":
        this.props.editarPersonaje()
        break;
        case "agregarNPC":
        this.props.guardarNPC()
        break;
        case "editarNPC":
        this.props.editarNPC()
        break;
        case "agregarLocacion":
        this.props.guardarLocacion()
        break;
        case "editarLocacion":
        this.props.editarLocacion()
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
        if ((Object.keys(this.props.editSelected).length > 0 && this.props.editSelected.constructor === Object)
            || (this.props.editingTextAreaTitle && this.props.editingTextAreaTitle !== '')
            || (Object.keys(this.props.actualTreePath).length > 0
                && this.props.actualTreePath.constructor === Object
                && this.props.actualTreePath.name !== 'locations')) {
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
                    case "agregarMonstruo":
                    return <BestiaryAdder/>;
                    case "editarMonstruo":
                    return <BestiaryEditor/>;
                    case "agregarPersonaje":
                    return <CharacterAdder/>;
                    case "editarPersonaje":
                    return <CharacterEditor/>;
                    case "agregarNPC":
                    return <NPCAdder/>;
                    case "editarNPC":
                    return <NPCEditor/>;
                    case "agregarLocacion":
                    return <LocacionAdder/>;
                    case "editarLocacion":
                    return <LocacionEditor/>;

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
