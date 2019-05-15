import React from 'react';
import Dropzone from 'react-dropzone';
import {capitalizeEveryWord} from '../../../utils/Utils';
var fs = window.require('fs');

function binaryRead(url){
  if (url !== '') {
    var urlContent = fs.readFileSync(url);
    return 'data:image/png;base64,' + urlContent.toString('base64');
  }
}

export default class Adder extends React.Component {

  constructor(props) {
    super();
  }

  render() {
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flex1 padding16">
                    <div className="gearTextInputContainer violet padding8">
                        <div>
                            Nombre
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.spellCargado.nombre}
                                onChange={(e)=> {
                                    this.props.changeStat("nombre", capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer violet padding8">
                        <div>
                            Nivel
                        </div>
                        <select className="gearTextInputWriteZone Luminari" value={this.props.spellCargado.level} onChange={(e)=> {this.props.changeStat("level", e.target.value)}}>
                            <option value={0}>Cantrip</option>
                            <option value={1}>1st</option>
                            <option value={2}>2nd</option>
                            <option value={3}>3rd</option>
                            <option value={4}>4th</option>
                            <option value={5}>5th</option>
                            <option value={6}>6th</option>
                            <option value={7}>7th</option>
                            <option value={8}>8th</option>
                            <option value={9}>9th</option>
                        </select> 
                    </div>
                    <div className="gearTextInputContainer violet padding8">
                        <div>
                            Escuela
                        </div>
                        <select className="gearTextInputWriteZone Luminari" value={this.props.spellCargado.school} onChange={(e)=> {this.props.changeStat("school", e.target.value)}}>
                            <option value="" disabled={true}>Elije la escuela del Hechizo</option>
                            <option value="Abjuration">Abjuration</option>
                            <option value="Conjuration">Conjuration</option>
                            <option value="Divination">Divination</option>
                            <option value="Enchantment">Enchantment</option>
                            <option value="Evocation">Evocation</option>
                            <option value="Illusion">Illusion</option>
                            <option value="Necromancy">Necromancy</option>
                            <option value="Transmutation">Transmutation</option>
                        </select> 
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
                        <img className="mapImage" src={!this.props.imagenASubir.startsWith('data:') ? binaryRead(this.props.imagenASubir) : this.props.imagenASubir}/>
                    </div>
                    : null}
                </div>
            </div>
        </div>
    );
  }
}
