import React from 'react';
import Dropzone from 'react-dropzone';
import {capitalizeEveryWord} from '../../../utils/Utils';

export default class Adder extends React.Component {

  constructor(props) {
    super();
    this.state = {
        hechizosSearchValue: ''
    }
    this.handleNumericInput = this.handleNumericInput.bind(this);
    this.addSpell = this.addSpell.bind(this);
    this.removeSpell = this.removeSpell.bind(this);
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

  addSpell(spellName) {
    let spellsCargados = this.props.monstruoCargado.spells;
    let repetido = spellsCargados.filter((nombreCargado)=> nombreCargado === spellName).length > 0;
    if (!repetido) {
        this.props.changeStat("spells", spellsCargados.concat(spellName))
    }
  }
  removeSpell(spellIndex) {
    let spellsCargados = this.props.monstruoCargado.spells.slice(0);
    spellsCargados.splice(spellIndex, 1);
    this.props.changeStat("spells", spellsCargados);
  }

  render() {
    let hechizos = this.props.spellList;
    let filteredHechizos = hechizos.filter((hechizo) => hechizo.nombre.toLowerCase().includes(this.state.hechizosSearchValue))
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex flex1 padding16">
                    <div className="gearTextInputContainer redish padding8">
                        <div>
                            Nombre
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.monstruoCargado.nombre}
                                onChange={(e)=> {
                                    this.props.changeStat("nombre", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer redish padding8">
                        <div>
                            Raza
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.monstruoCargado.raza}
                                onChange={(e)=> {
                                    this.props.changeStat("raza", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer redish padding8">
                        <div>
                            Max HP
                        </div>
                        <div>
                            <input
                                id="maxHP"
                                type="text"
                                defaultValue={this.props.monstruoCargado.maxHP}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("maxHP", parseInt(e.target.value, 10))
                                }}
                                maxLength="4"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer redish padding8">
                        <div>
                            Armor Class
                        </div>
                        <div>
                            <input
                                id="AC"
                                type="text"
                                defaultValue={this.props.monstruoCargado.armor}
                                className="gearTextInputWriteZone Luminari"
                                onChange={(e)=> {
                                    e.target.value = this.handleNumericInput(e.target.value);
                                    this.props.changeStat("armor", parseInt(e.target.value, 10))
                                }}
                                maxLength="3"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer redish padding8">
                        <div>
                            Challenge Rating
                        </div>
                        <select className="gearTextInputWriteZone Luminari" value={this.props.monstruoCargado.rating} onChange={(e)=> {this.props.changeStat("rating", parseFloat(e.target.value))}}>
                            <option value={0}>0</option>
                            <option value={0.125}>1/8</option>
                            <option value={0.25}>1/4</option>
                            <option value={0.5}>1/2</option>
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
                            <option value={21}>21</option>
                            <option value={22}>22</option>
                            <option value={23}>23</option>
                            <option value={24}>24</option>
                            <option value={25}>25</option>
                            <option value={26}>26</option>
                            <option value={27}>27</option>
                            <option value={28}>28</option>
                            <option value={29}>29</option>
                            <option value={30}>30</option>
                            <option value={99}>Beyond Possible</option>
                        </select> 
                    </div>
                    <div className="gearTextInputContainer redish padding8 flex1 autoWidth flex">
                        <div className="flexRow relative">
                            <div className="flex1 autoHeight">
                                Lista de Hechizos
                            </div>
                            <div className="flex1 autoHeight">
                                Hechizos de la criatura
                            </div>
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <div className="messagesContainer personajesListContainer backgroundFuse">
                                    {filteredHechizos.map((hechizo, index)=>
                                        <div key={'hechizoListGear' + hechizo.nombre + index}
                                            className="violet contentTitleBox hoverPoint"
                                            onClick={()=> {this.addSpell(hechizo.nombre)}}
                                        >
                                            <div className="contentTitleBoxTitle">
                                                {hechizo.nombre}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="loggerInputContainer">
                                    <input
                                        id="searchBar"
                                        type="text"
                                        className="searchBar"
                                        placeholder="Buscar Hechizo"
                                        value={this.state.hechizosSearchValue}
                                        onChange={(event)=> this.setState({hechizosSearchValue: event.target.value})}/>
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.monstruoCargado.spells.map((hechizo, index)=> 
                                    <div key={'hechizoRemovalShowList' + hechizo + index} className="relative gearAdderItemList violet paddingRight24">
                                        <div>
                                            {hechizo}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish" onClick={()=>this.removeSpell(index)}>X</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex1 flex padding16 centered">
                    <div className="dropzone marginBottom16">
                        <Dropzone onDropAccepted={file=> this.props.uploadImage(file[0])} multiple={false} accept='image/jpeg, image/png, image/jpg'>
                        {({getRootProps, getInputProps}) => (
                            <div {...getRootProps()} className="fill">
                                <input {...getInputProps()} />
                                <div className="dropzoneText">Haz click para seleccionar la imagen a subir o arrastrala a este recuadro</div>
                            </div>
                        )}
                        </Dropzone>
                    </div>
                    {this.props.imagenASubir !== ''
                    ? <div className="flex flex1 relative">
                        <img className="mapImage" src={!this.props.imagenASubir.startsWith('data:') ? this.props.imagenASubir + "?random=" + Math.random() : this.props.imagenASubir}/>
                    </div>
                    : null}
                </div>
            </div>
        </div>
    );
  }
}
