import React from 'react';
import { percent } from '../../../utils/Utils';

export default class TurnoRow extends React.Component {

  constructor(props) {
    super();
    this.handleNumericInput = this.handleNumericInput.bind(this);
  }

  handleNumericInput(input) {
      let numericPart = 0;
      try {
        numericPart = parseInt(input.toString().replace(/[^0-9]/g,''), 10);
        let numericPartString = numericPart.toString();
        if (numericPartString.length > 0) {
          for (let i = 1; i < numericPartString.length; i++) {
            if (numericPartString.startsWith('0')) {
              numericPartString = numericPartString.substring(1);
            }
          }
          numericPart = parseInt(numericPartString, 10);
        }
        return numericPart;
      } catch (e) {console.log(e)}
      return numericPart;
  }

  render() {
    let data = this.props.turnoData;
    return(
        <div className="greyish contentTitleBox relative">
            <div className={"absolute " + data.color} style={{maxWidth: "100%", top: "0px", bottom: "0px", left: "0px", right: (100 - (percent(data.entidad.maxHP, data.floatingStats.actualHP)) + "%")}}/>
            <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
            onClick={()=> this.props.mostrarDetalles()}>
                ⬑
            </div>
            <div className="combatantTitleBox relative">
                <input
                    id="nombre"
                    type="text"
                    defaultValue={data.floatingStats.nombreAMostrar || data.entidad.nombre}
                    onBlur={(e)=> {
                        this.props.changeStat("nombreAMostrar", e.target.value);
                    }}
                    onClick={(e)=>{e.stopPropagation()}}
                    className="seamlessInput"
                />
                <div className="hpTextInput flexRow spaced sideBorder">
                    <input
                        id="HP"
                        type="text"
                        defaultValue={data.floatingStats.actualHP}
                        onBlur={(e)=> {
                            this.props.changeStat("actualHP", e.target.value);
                        }}
                        onClick={(e)=>{e.stopPropagation()}}
                        className="seamlessInput"
                        style={{maxWidth: "35px"}}
                        onChange={(e)=> e.target.value = this.handleNumericInput(e.target.value)}
                        maxLength="4"
                    />
                    <div>/{data.entidad.maxHP}</div>
                </div>
                <input
                    id="AC"
                    type="text"
                    defaultValue={data.floatingStats.actualArmor}
                    onBlur={(e)=> {
                        this.props.changeStat("actualArmor", e.target.value);
                    }}
                    onClick={(e)=>{e.stopPropagation()}}
                    className="seamlessInput acTextInput sideBorder"
                    onChange={(e)=> e.target.value = this.handleNumericInput(e.target.value)}
                    maxLength="3"
                />
                <input
                    id="init"
                    type="text"
                    defaultValue={data.floatingStats.init}
                    onBlur={(e)=> {
                        this.props.changeStat("init", e.target.value);
                    }}
                    onClick={(e)=>{e.stopPropagation()}}
                    className="seamlessInput initTextInput sideBorder"
                    onChange={(e)=> e.target.value = this.handleNumericInput(e.target.value)}
                    maxLength="3"
                />
            </div>

            {!data.permanent
                ? <div
                    className="botonAmpliar hoverPoint clickFeedback sangron"
                    onClick={()=>this.props.removeFromList()
                }>
                    X
                </div>
                : null
            }
        </div>
    )

  }
}
