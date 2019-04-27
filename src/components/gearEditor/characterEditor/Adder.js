import React from 'react';
import {capitalizeEveryWord, capitalizeWord} from '../../../utils/Utils';

export default class Adder extends React.Component {

  constructor(props) {
    super();
    this.state = {
        creatingClass: {
            class: '',
            level: 1
        },
        resistanceToAdd: '',
        immunityToAdd: ''
    }
    this.handleNumericInput = this.handleNumericInput.bind(this);
    this.addElement = this.addElement.bind(this);
    this.removeElement = this.removeElement.bind(this);
    this.addClass = this.addClass.bind(this);
    this.addToHitDiceList = this.addToHitDiceList.bind(this);
    this.hitDiceType = this.hitDiceType.bind(this);
    this.removeHitDice = this.removeHitDice.bind(this)
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
        numericPart = parseInt(numericPartString, 10) || 0;
      }
      return numericPart;
    } catch (e) {console.log(e)}
    return numericPart;
  }

  addElement(elementName, targetStat) {
    let statList = this.props.personajeCargado[targetStat];
    let repetido = statList.filter((nombreCargado)=> nombreCargado === elementName).length > 0;
    if (!repetido) {
        this.props.changeStat(targetStat, statList.concat(elementName))
    }
  }
  addClass() {
    let classList = this.props.personajeCargado.clases;
    let characterTotalLevel = this.state.creatingClass.level;
    let repetido = classList.filter((clase)=> {
        characterTotalLevel = characterTotalLevel + clase.level;
        return (clase.class === this.state.creatingClass.class);
    }).length > 0;
    if (!repetido) {
        let proficiency = Math.floor((characterTotalLevel - 1) / 4) + 2;
        this.props.changeStat("clases", classList.concat(this.state.creatingClass));
        this.props.changeStat("level", characterTotalLevel);
        this.props.changeStat("proficiency", proficiency);
        this.addToHitDiceList(this.state.creatingClass);
        this.setState({creatingClass: {class: '', level: 1}});
    }
  }

  hitDiceType(classname) {
    switch (classname) {
        case 'Barbarian':
            return "12";
        case 'Fighter':
        case 'Paladin':
        case 'Ranger':
            return "10";
        case 'Bard':
        case 'Cleric':
        case 'Druid':
        case 'Monk':
        case 'Mystic':
        case 'Artificer':
        case 'Rogue':
        case 'Warlock':
            return "8";
        case 'Wizard':
        case 'Sorcerer':
            return "6";
        
        default: return '';
    }
  };

  addToHitDiceList(classCont) {
    let classname = classCont.class;
    let classLevel = classCont.level;
    let hitDiceList = this.props.personajeCargado.maxHitDice;
    let hitDiceTipe = this.hitDiceType(classname);
    let repetidoIndex = null;
    let repetido = hitDiceList.filter((hitDie, index)=> {
        if (Object.keys(hitDie)[0] === hitDiceTipe) {
            repetidoIndex = index;
            return true;
        }
        return false;
    }).length > 0;
    if (!repetido) {
        this.props.changeStat("maxHitDice", hitDiceList.concat({[hitDiceTipe]: classLevel}));
    } else {
        hitDiceList[repetidoIndex] = {[hitDiceTipe]: classLevel + hitDiceList[repetidoIndex][hitDiceTipe]};
        this.props.changeStat("maxHitDice", hitDiceList);
    }
  }
  removeHitDice(className, level) {
    let classList = this.props.personajeCargado.clases;
    let characterTotalLevel = 0 - level;
    for (let j = 0; j < classList.length; j++ ) {
        characterTotalLevel = characterTotalLevel + classList[j].level;
    }
    let proficiency = Math.floor((characterTotalLevel - 1) / 4) + 2;
    let hitDiceList = this.props.personajeCargado.maxHitDice.slice(0);
    let hitDiceTipe = this.hitDiceType(className);
    let indiceDelDado = null;
    for (let i = 0; i < hitDiceList.length; i++) {
        if (Object.keys(hitDiceList[i])[0] === hitDiceTipe) {
            indiceDelDado = i;
            i = i + hitDiceList.length;
        }
    };
    let listIndexValue = hitDiceList[indiceDelDado][Object.keys(hitDiceList[indiceDelDado])[0]];
    hitDiceList[indiceDelDado][Object.keys(hitDiceList[indiceDelDado])[0]] = listIndexValue - level;
    if ( hitDiceList[indiceDelDado][Object.keys(hitDiceList[indiceDelDado])[0]] < 1 ) {
        hitDiceList.splice(indiceDelDado, 1);
    }
    this.props.changeStat("maxHitDice", hitDiceList);
    this.props.changeStat("level", characterTotalLevel);
    this.props.changeStat("proficiency", proficiency);
  }

  removeElement(elementIndex, targetStat) {
    let statList = this.props.personajeCargado[targetStat].slice(0);
    statList.splice(elementIndex, 1);
    this.props.changeStat(targetStat, statList);
  }

  render() {
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flexRow flex1 padding16 flexWrap fromStart">
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Nombre
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.personajeCargado.nombre}
                                onChange={(e)=> {
                                    this.props.changeStat("nombre", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Raza
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.personajeCargado.raza}
                                onChange={(e)=> {
                                    this.props.changeStat("raza", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Background
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.personajeCargado.background}
                                onChange={(e)=> {
                                    this.props.changeStat("background", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Alignment
                        </div>
                        <select className="gearTextInputWriteZone Luminari" value={this.props.personajeCargado.alignment} onChange={(e)=> {this.props.changeStat("alignment", e.target.value)}}>
                            <option value={"Lawful Good"}>Lawful Good</option>
                            <option value={"Lawful Neutral"}>Lawful Neutral</option>
                            <option value={"Lawful Evil"}>Lawful Evil</option>
                            <option value={"Neutral Good"}>Neutral Good</option>
                            <option value={"True Neutral"}>True Neutral</option>
                            <option value={"Neutral Evil"}>Neutral Evil</option>
                            <option value={"Chaotic Good"}>Chaotic Good</option>
                            <option value={"Chaotic Neutral"}>Chaotic Neutral</option>
                            <option value={"Chaotic Evil"}>Chaotic Evil</option>
                        </select> 
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Max HP
                        </div>
                        <div>
                            <input
                                id="maxHP"
                                type="text"
                                defaultValue={this.props.personajeCargado.maxHP}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("maxHP", parseInt(e.target.value, 10))
                                }}
                                maxLength="4"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Armor Class
                        </div>
                        <div>
                            <input
                                id="AC"
                                type="text"
                                defaultValue={this.props.personajeCargado.armor}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("armor", parseInt(e.target.value, 10))
                                }}
                                maxLength="3"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Speed
                        </div>
                        <div>
                            <input
                                id="speed"
                                type="text"
                                defaultValue={this.props.personajeCargado.speed}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("speed", parseInt(e.target.value, 10))
                                }}
                                maxLength="3"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Darkvision
                        </div>
                        <select className="gearTextInputWriteZone Luminari"
                            value={this.props.personajeCargado.darkvision}
                            onChange={(e)=> this.props.changeStat("darkvision", e.target.value)}
                        >
                            <option value={0}>Sin Darkvision</option>
                            <option value={30}>30ft</option>
                            <option value={60}>60ft</option>
                            <option value={90}>90ft</option>
                            <option value={120}>120ft</option>
                        </select>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 flex">
                        <div>
                            Clases
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <select className="gearTextInputWriteZone Luminari"
                                    value={this.state.creatingClass.class}
                                    onChange={(e)=> {this.setState({creatingClass: {...this.state.creatingClass, class: e.target.value}})
                                }}>
                                    <option value="" disabled={true}>Elije una clase</option>
                                    <option value={"Barbarian"}>Barbarian</option>
                                    <option value={"Bard"}>Bard</option>
                                    <option value={"Cleric"}>Cleric</option>
                                    <option value={"Druid"}>Druid</option>
                                    <option value={"Fighter"}>Fighter</option>
                                    <option value={"Monk"}>Monk</option>
                                    <option value={"Paladin"}>Paladin</option>
                                    <option value={"Ranger"}>Ranger</option>
                                    <option value={"Rogue"}>Rogue</option>
                                    <option value={"Sorcerer"}>Sorcerer</option>
                                    <option value={"Warlock"}>Warlock</option>
                                    <option value={"Wizard"}>Wizard</option>
                                    <option value={"Mystic"}>Mystic</option>
                                    <option value={"Artificer"}>Artificer</option>
                                </select>
                                <select className="gearTextInputWriteZone Luminari"
                                    value={this.state.creatingClass.level}
                                    onChange={(e)=> {this.setState({creatingClass: {...this.state.creatingClass, level: parseInt(e.target.value, 10)}})
                                }}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                    <option value={16}>16</option>
                                    <option value={17}>17</option>
                                    <option value={18}>18</option>
                                    <option value={19}>19</option>
                                    <option value={20}>20</option>
                                    <option value={20}>20</option>
                                </select>
                                <div
                                    onClick={()=> {
                                        if (this.state.creatingClass.class !== '') {
                                            this.addClass()
                                        }
                                    }}
                                    className="gearAdderItemList yellowish paddingHorizontal8 hoverPoint clickFeedback"
                                >
                                    Cargar Clase
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.personajeCargado.clases.map((clase, index)=> 
                                    <div key={'claseRemovalShowList' + clase + index} className="relative gearAdderItemList backWheat paddingRight24">
                                        <div>
                                            {clase.class + ': ' + clase.level}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish"
                                            onClick={()=> {
                                                this.removeElement(index, "clases");
                                                this.removeHitDice(clase.class, clase.level);
                                            }}>
                                            X
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Ability Bonus Initiative
                        </div>
                        <div>
                            <input
                                id="init"
                                type="text"
                                defaultValue={this.props.personajeCargado.additionalInit}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("additionalInit", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width20">
                        <div>
                            Ability Bonus Perception
                        </div>
                        <div>
                            <input
                                id="percep"
                                type="text"
                                defaultValue={this.props.personajeCargado.additionalPercep}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("additionalPercep", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Strength
                        </div>
                        <div>
                            <input
                                id="strength"
                                type="text"
                                defaultValue={this.props.personajeCargado.strength}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("strength", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Dexterity
                        </div>
                        <div>
                            <input
                                id="dexterity"
                                type="text"
                                defaultValue={this.props.personajeCargado.dexterity}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("dexterity", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Constitution
                        </div>
                        <div>
                            <input
                                id="constitution"
                                type="text"
                                defaultValue={this.props.personajeCargado.constitution}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("constitution", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Intelligence
                        </div>
                        <div>
                            <input
                                id="intelligence"
                                type="text"
                                defaultValue={this.props.personajeCargado.intelligence}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("intelligence", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Wisdom
                        </div>
                        <div>
                            <input
                                id="wisdom"
                                type="text"
                                defaultValue={this.props.personajeCargado.wisdom}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("wisdom", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer greenish padding8 width30">
                        <div>
                            Charisma
                        </div>
                        <div>
                            <input
                                id="charisma"
                                type="text"
                                defaultValue={this.props.personajeCargado.charisma}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("charisma", parseInt(e.target.value, 10))
                                }}
                                maxLength="2"
                            />
                        </div>
                    </div>

                    <div className="gearTextInputContainer greenish padding8 flex">
                        <div>
                            Proficiencies
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('strength') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('strength') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('strength');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('strength');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>STR Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('dexterity') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('dexterity') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('dexterity');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('dexterity');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>DEX Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('constitution') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('constitution') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('constitution');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('constitution');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>CON Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('intelligence') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('intelligence') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('intelligence');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('intelligence');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>INT Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('wisdom') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('wisdom') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('wisdom');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('wisdom');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>WIS Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('charisma') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('charisma') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('charisma');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('charisma');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>CHA Save</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('athletics') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('athletics') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('athletics');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('athletics');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Athletics</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('acrobatics') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('acrobatics') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('acrobatics');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('acrobatics');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Acrobatics</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('sleightOfHand') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('sleightOfHand') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('sleightOfHand');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('sleightOfHand');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>S. of Hand</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('stealth') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('stealth') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('stealth');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('stealth');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Stealth</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('arcana') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('arcana') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('arcana');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('arcana');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Arcana</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('history') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('history') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('history');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('history');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>History</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('investigation') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('investigation') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('investigation');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('investigation');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Investigation</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('nature') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('nature') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('nature');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('nature');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Nature</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('religion') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('religion') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('religion');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('religion');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Religion</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('animalHandling') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('animalHandling') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('animalHandling');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('animalHandling');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>A. Handling</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('insight') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('insight') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('insight');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('insight');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Insight</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('medicine') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('medicine') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('medicine');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('medicine');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Medicine</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('perception') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('perception') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('perception');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('perception');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Perception</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('survival') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('survival') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('survival');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('survival');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Survival</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('deception') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('deception') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('deception');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('deception');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Deception</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('intimidation') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('intimidation') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('intimidation');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('intimidation');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Intimidation</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('performance') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('performance') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('performance');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('performance');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Performance</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.proficiencies.indexOf('persuasion') >= 0}
                                        disabled={this.props.personajeCargado.expertise.indexOf('persuasion') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                let indexToRemove = proficienciesCopy.indexOf('persuasion');
                                                proficienciesCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            } else {
                                                let proficienciesCopy = this.props.personajeCargado.proficiencies.slice(0);
                                                proficienciesCopy = proficienciesCopy.concat('persuasion');
                                                this.props.changeStat("proficiencies", proficienciesCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Persuasion</div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gearTextInputContainer greenish padding8 flex">
                        <div>
                            Expertise
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('strength') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('strength') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('strength');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('strength');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>STR Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('dexterity') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('dexterity') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('dexterity');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('dexterity');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>DEX Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('constitution') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('constitution') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('constitution');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('constitution');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>CON Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('intelligence') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('intelligence') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('intelligence');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('intelligence');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>INT Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('wisdom') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('wisdom') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('wisdom');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('wisdom');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>WIS Save</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('charisma') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('charisma') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('charisma');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('charisma');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>CHA Save</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('athletics') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('athletics') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('athletics');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('athletics');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Athletics</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('acrobatics') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('acrobatics') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('acrobatics');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('acrobatics');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Acrobatics</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('sleightOfHand') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('sleightOfHand') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('sleightOfHand');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('sleightOfHand');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>S. of Hand</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('stealth') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('stealth') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('stealth');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('stealth');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Stealth</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('arcana') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('arcana') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('arcana');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('arcana');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Arcana</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('history') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('history') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('history');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('history');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>History</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('investigation') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('investigation') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('investigation');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('investigation');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Investigation</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('nature') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('nature') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('nature');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('nature');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Nature</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('religion') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('religion') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('religion');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('religion');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Religion</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('animalHandling') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('animalHandling') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('animalHandling');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('animalHandling');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>A. Handling</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('insight') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('insight') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('insight');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('insight');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Insight</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('medicine') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('medicine') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('medicine');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('medicine');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Medicine</div> 
                                </div>
                            </div>
                            <div className="flex1 relative">
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('perception') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('perception') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('perception');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('perception');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Perception</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('survival') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('survival') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('survival');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('survival');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Survival</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('deception') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('deception') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('deception');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('deception');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Deception</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('intimidation') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('intimidation') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('intimidation');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('intimidation');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Intimidation</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('performance') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('performance') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('performance');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('performance');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Performance</div> 
                                </div>
                                <div className="flexRow checkBoxTextGear"> 
                                    <input 
                                        type="checkbox" 
                                        checked={this.props.personajeCargado.expertise.indexOf('persuasion') >= 0}
                                        disabled={this.props.personajeCargado.proficiencies.indexOf('persuasion') >= 0}
                                        onChange={(e) => {
                                            if (!e.target.checked) {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                let indexToRemove = expertiseCopy.indexOf('persuasion');
                                                expertiseCopy.splice(indexToRemove, 1);
                                                this.props.changeStat("expertise", expertiseCopy);
                                            } else {
                                                let expertiseCopy = this.props.personajeCargado.expertise.slice(0);
                                                expertiseCopy = expertiseCopy.concat('persuasion');
                                                this.props.changeStat("expertise", expertiseCopy);
                                            }
                                        }} 
                                    /> 
                                    <div>Persuasion</div> 
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="gearTextInputContainer greenish padding8 flex">
                        <div>
                            Resistencias
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Escribe una resistencia"
                                        value={this.state.resistanceToAdd}
                                        onChange={(e)=> {
                                            this.setState({resistanceToAdd: capitalizeWord(e.target.value)});
                                        }}
                                        className="gearTextInputWriteZone Luminari"
                                        maxLength="64"
                                    />
                                </div>
                                <div
                                    onClick={()=> {
                                        if (this.state.resistanceToAdd !== '') {
                                            this.addElement(this.state.resistanceToAdd, "resistances");
                                            this.setState({resistanceToAdd: ''});
                                        }
                                    }}
                                    className="gearAdderItemList yellowish paddingHorizontal8 hoverPoint clickFeedback"
                                >
                                    Cargar Resistencia
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.personajeCargado.resistances.map((resist, index)=> 
                                    <div key={'resistRemovalShowList' + resist + index} className="relative gearAdderItemList backSilver paddingRight24">
                                        <div>
                                            {resist}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish"
                                            onClick={()=> {
                                                this.removeElement(index, "resistances");
                                            }}>
                                            X
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="gearTextInputContainer greenish padding8 flex">
                        <div>
                            Inmunidades
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Escribe una inmunidad"
                                        value={this.state.immunityToAdd}
                                        onChange={(e)=> {
                                            this.setState({immunityToAdd: capitalizeWord(e.target.value)});
                                        }}
                                        className="gearTextInputWriteZone Luminari"
                                        maxLength="64"
                                    />
                                </div>
                                <div
                                    onClick={()=> {
                                        if (this.state.immunityToAdd !== '') {
                                            this.addElement(this.state.immunityToAdd, "immunities");
                                            this.setState({immunityToAdd: ''});
                                        }
                                    }}
                                    className="gearAdderItemList yellowish paddingHorizontal8 hoverPoint clickFeedback"
                                >
                                    Cargar Inmunidad
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.personajeCargado.immunities.map((immunity, index)=> 
                                    <div key={'immunityRemovalShowList' + immunity + index} className="relative gearAdderItemList backGold paddingRight24">
                                        <div>
                                            {immunity}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish"
                                            onClick={()=> {
                                                this.removeElement(index, "immunities");
                                            }}>
                                            X
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
  }
}
