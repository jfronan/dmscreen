import React from 'react';
import { capitalizeWord, capitalizeEveryWord, addPlusIfPositive } from '../../../utils/Utils';

export default class PcCard extends React.Component {

  constructor(props) {
    super();
    this.additionalProfScore = this.additionalProfScore.bind(this);
  }

  additionalProfScore(skill) {
    var data = this.props.data;
    if (data.expertise.includes(skill)) {
    return 4;
    }
    if (data.proficiencies.includes(skill)) {
    return 2;
    }
    return 0;
  }

  render() {
    var data = this.props.data;
    return (
      <div id="pcContainer" className="flexRow fill">
        <div className="flex1">
            <div id="PCclaseLvl">
                {data.clases.map((clase)=>
                    <div>
                        {capitalizeWord(clase.class) + " " + clase.level}
                    </div>
                )}
            </div>
            <div className="flexRow spaced">
                <div id="PCbackground">
                    {capitalizeEveryWord(data.background)}
                </div>
                <div id="PCrace">
                    {capitalizeEveryWord(data.raza)}
                </div>
            </div>
            <div className="flexRow spaced">
                <div id="PCalignment">{capitalizeEveryWord(data.alignment)}</div>
                <div id="PCxp">{"XP: " + data.experience}</div>
            </div>
            <div className="flexRow spaced bold">
                <div id="PCHP">
                    <div>Max HP</div>
                    <div>{data.maxHp}</div>
                </div>
                <div id="PCarmor">
                    <div>AC</div>
                    <div>{data.armor}</div>
                </div>
                <div id="PCspeed">
                    <div>Speed</div>
                    <div>{data.speed}</div>
                </div>
            </div>

            <div className="flexRow spaced bold">
                <div id="PCproficiency">
                    <div>Proficiency</div>
                    <div>+{data.proficiency}</div>
                </div>
                <div id="PCinitiative">
                    <div>Initiative</div>
                    <div>{addPlusIfPositive(Math.floor(data.dexterity / 2) - 5 + data.additionalInit)}</div>
                </div>
                <div id="PCpassivePerception">
                    <div>P. Perception</div>
                    <div>{Math.floor(data.wisdom / 2) + 5 + data.additionalPercep + this.additionalProfScore('perception')}</div>
                </div>
            </div>
            <div id="PChit-dice">
                <div>Hit Dice</div>
                {data.maxHitDice.map((dice)=>
                    <div>
                        {dice[Object.keys(dice)[0]] + "d" + Object.keys(dice)[0]}
                    </div>
                )}
            </div>
            <div id="PCstrength" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Strength</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.strength}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.strength / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.strength / 2) - 5 + this.additionalProfScore('strength'))}</div>
                    </div>
                </div>
            </div>
            <div id="PCdexterity" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Dexterity</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.dexterity}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.dexterity / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.dexterity / 2) - 5 + this.additionalProfScore('dexterity'))}</div>
                    </div>
                </div>
            </div>
            <div id="PCconstitution" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Constitution</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.constitution}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.constitution / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.constitution / 2) - 5 + this.additionalProfScore('constitution'))}</div>
                    </div>
                </div>
            </div>
            <div id="PCintelligence" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Intelligence</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.intelligence}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.intelligence / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('intelligence'))}</div>
                    </div>
                </div>
            </div>
            <div id="PCwisdom" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Wisdom</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.wisdom}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.wisdom / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('wisdom'))}</div>
                    </div>
                </div>
            </div>
            <div id="PCcharisma" className="bold">
                <div style={{"border-bottom": "solid 1px black"}}>Charisma</div>
                <div className="flexRow spaceAround">
                    <div>
                        <div>Score</div>
                        <div>{data.charisma}</div>
                    </div>
                    <div>
                        <div>Modifier</div>
                        <div>{addPlusIfPositive(Math.floor(data.charisma / 2) - 5)}</div>
                    </div>
                    <div>
                        <div>Save</div>
                        <div>{addPlusIfPositive(Math.floor(data.charisma / 2) - 5 + this.additionalProfScore('charisma'))}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex1 bold">
            <div id="PCathletics" className="flexRow spaced strBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('athletics') === 4 ? "E" : this.additionalProfScore('athletics') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Athletics (str)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.strength / 2) - 5 + this.additionalProfScore('athletics'))}
                </div>
            </div>

            <div id="PCacrobatics" className="flexRow spaced dexBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('acrobatics') === 4 ? "E" : this.additionalProfScore('acrobatics') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Acrobatics (dex)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.dexterity / 2) - 5 + this.additionalProfScore('acrobatics'))}
                </div>
            </div>
            <div id="PCsleight-of-hand" className="flexRow spaced dexBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('sleightOfHand') === 4 ? "E" : this.additionalProfScore('sleightOfHand') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Sleight of Hand (dex)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.dexterity / 2) - 5 + this.additionalProfScore('sleightOfHand'))}
                </div>
            </div>
            <div id="PCstealth" className="flexRow spaced dexBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('stealth') === 4 ? "E" : this.additionalProfScore('stealth') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Stealth (dex)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.dexterity / 2) - 5 + this.additionalProfScore('stealth'))}
                </div>
            </div>

            <div id="PCarcana" className="flexRow spaced intBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('arcana') === 4 ? "E" : this.additionalProfScore('arcana') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Arcana (int)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('arcana'))}
                </div>
            </div>
            <div id="PChistory" className="flexRow spaced intBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('history') === 4 ? "E" : this.additionalProfScore('history') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        History (int)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('history'))}
                </div>
            </div>
            <div id="PCinvestigation" className="flexRow spaced intBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('investigation') === 4 ? "E" : this.additionalProfScore('investigation') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Investigation (int)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('investigation'))}
                </div>
            </div>
            <div id="PCnature" className="flexRow spaced intBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('nature') === 4 ? "E" : this.additionalProfScore('nature') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Nature (int)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('nature'))}
                </div>
            </div>
            <div id="PCreligion" className="flexRow spaced intBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('religion') === 4 ? "E" : this.additionalProfScore('religion') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Religion (int)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.intelligence / 2) - 5 + this.additionalProfScore('religion'))}
                </div>
            </div>

            <div id="PCanimal-handling" className="flexRow spaced wisBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('animalHandling') === 4 ? "E" : this.additionalProfScore('animalHandling') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Animal Handling (wis)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('animalHandling'))}
                </div>
            </div>
            <div id="PCinsight" className="flexRow spaced wisBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('insight') === 4 ? "E" : this.additionalProfScore('insight') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Insight (wis)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('insight'))}
                </div>
            </div>
            <div id="PCmedicine" className="flexRow spaced wisBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('medicine') === 4 ? "E" : this.additionalProfScore('medicine') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Medicine (wis)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('medicine'))}
                </div>
            </div>
            <div id="PCperception" className="flexRow spaced wisBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('perception') === 4 ? "E" : this.additionalProfScore('perception') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Perception (wis)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('perception'))}
                </div>
            </div>
            <div id="PCsurvival" className="flexRow spaced wisBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('survival') === 4 ? "E" : this.additionalProfScore('survival') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Survival (wis)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.wisdom / 2) - 5 + this.additionalProfScore('survival'))}
                </div>
            </div>

            <div id="PCdeception" className="flexRow spaced chaBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('deception') === 4 ? "E" : this.additionalProfScore('deception') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Deception (cha)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.charisma / 2) - 5 + this.additionalProfScore('deception'))}
                </div>
            </div>
            <div id="PCintimidation" className="flexRow spaced chaBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('intimidation') === 4 ? "E" : this.additionalProfScore('intimidation') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Intimidation (cha)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.charisma / 2) - 5 + this.additionalProfScore('intimidation'))}
                </div>
            </div>
            <div id="PCperformance" className="flexRow spaced chaBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('performance') === 4 ? "E" : this.additionalProfScore('performance') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Performance (cha)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.charisma / 2) - 5 + this.additionalProfScore('performance'))}
                </div>
            </div>
            <div id="PCpersuasion" className="flexRow spaced chaBack">
                <div className="flexRow">
                    <div className="proficiencyBoxSignal">
                        {this.additionalProfScore('persuasion') === 4 ? "E" : this.additionalProfScore('persuasion') === 2 ? "P" : ""}
                    </div>
                    <div style={{"padding-left": "4px"}}>
                        Persuasion (cha)
                    </div>
                </div>
                <div style={{"padding-right": "4px"}}>
                    {addPlusIfPositive(Math.floor(data.charisma / 2) - 5 + this.additionalProfScore('persuasion'))}
                </div>
            </div>
            
            {data.resistances.length > 0
                ? <div id="PCresistances" className="backSilver">
                    <div style={{"border-bottom": "solid 1px black", "text-align": "center"}}>Resistances</div>
                    <div className="flexRow spaceAround">
                        {data.resistances.map((resistance)=>
                            <div>{capitalizeEveryWord(resistance)}</div>
                        )}
                    </div>
                </div>
                : null
            }
            {data.immunities.length > 0
                ? <div id="PCimmunities" className="backGold">
                    <div style={{"border-bottom": "solid 1px black", "text-align": "center"}}>Immunities</div>
                    <div className="flexRow spaceAround">
                        {data.immunities.map((immunitie)=>
                            <div>{capitalizeEveryWord(immunitie)}</div>
                        )}
                    </div>
                </div>
                : null
            }
            {data.darkvision > 0
                ? <div id="PCdarkvision" className="flexRow spaceAround backGrey">
                    <div>Darkvision</div>
                    <div>{data.darkvision}ft</div>
                </div>
                : null
            }
        </div>
      </div>
    );
  }
}
