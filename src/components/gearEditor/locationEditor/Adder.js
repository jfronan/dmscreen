import React from 'react';
import Dropzone from 'react-dropzone';
import {capitalizeWord, capitalizeEveryWord} from '../../../utils/Utils';

export default class Adder extends React.Component {

  constructor(props) {
    super();
    this.state = {
        showSelectSaveLocScreen: props.editingTextAreaTitle === '',
        mostrarRender: false,
        bestiarySearchValue: '',
        npcSearchValue: ''
    }
    this.addBeast = this.addBeast.bind(this);
    this.removeBeast = this.removeBeast.bind(this);
    this.addNpc = this.addNpc.bind(this);
    this.removeNpc = this.removeNpc.bind(this);
  }

  addBeast(beastName) {
    let monstruosCargados = this.props.monstruosAGuardar;
    let repetido = monstruosCargados.filter((nombreCargado)=> nombreCargado === beastName).length > 0;
    if (!repetido) {
        this.props.changeStat("monsters", monstruosCargados.concat(beastName))
    }
  }
  removeBeast(beastIndex) {
    let monstruosCargados = this.props.monstruosAGuardar.slice(0);
    monstruosCargados.splice(beastIndex, 1);
    this.props.changeStat("monsters", monstruosCargados);
  }

  addNpc(npcName) {
    let npcsCargados = this.props.npcssAGuardar;
    let repetido = npcsCargados.filter((nombreCargado)=> nombreCargado === npcName).length > 0;
    if (!repetido) {
        this.props.changeStat("npcs", npcsCargados.concat(npcName))
    }
  }
  removeNpc(beastIndex) {
    let npcsCargados = this.props.npcssAGuardar.slice(0);
    npcsCargados.splice(beastIndex, 1);
    this.props.changeStat("npcs", npcsCargados);
  }

  render() {
    if (this.state.showSelectSaveLocScreen) {
        return (
            <div className="fill flex relative">
                <div className="fill paddingBottom64 relative flexRow">
                    <div className="flex1 padding16 relative">
                        <div className="fill relative">
                            <div id="navigatorLocationTitle" className="springreen contentTitleBox">
                                <div className="navegacionBackButton contentTitleBoxTitle hoverPoint clickFeedback"
                                onClick={()=> {this.props.goBackToParent()}}>
                                ⬑
                                </div>
                                <div className="contentTitleBoxTitle">{capitalizeWord(this.props.actualTreePath.name)}</div>
                            </div>
                            <div id="subLocsContainer" className="subLocContainer scroll">
                            {this.props.actualTreePath.subLocs
                                ? this.props.actualTreePath.subLocs.map((subLoc, index) => 
                                    <div key={"locacion" + subLoc.name + index} className="subLocBox hoverPoint" onClick={()=> {this.props.goToSubLoc(index)}}>
                                        <div className="subLocTitle">→ {capitalizeWord(subLoc.name)}</div>
                                    </div>
                                )
                                : null}
                            </div>
                            <div className="gearConfirmLocation colorMapa hoverPoint clickFeedback" onClick={()=> this.setState({showSelectSaveLocScreen: false})}>
                                Crear dentro de "{capitalizeWord(this.props.actualTreePath.name)}"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    let monsters = this.props.bestiario;
    let filteredMonsters = monsters.filter((monster) => monster.nombre.toLowerCase().includes(this.state.bestiarySearchValue))
    let npcs = this.props.npcList;
    let filteredNpcs = npcs.filter((npc) => npc.toLowerCase().includes(this.state.npcSearchValue))
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flexRow flex1 padding16 flexWrap fromStart">
                    <div className="gearTextInputContainer colorMapa padding8">
                        <div>
                            Nombre
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.nombreLocation}
                                onChange={(e)=> {
                                    this.props.textAreaTitleChange(capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer colorMapa padding8 hoverPoint clickFeedback button">
                        <div onClick={()=> this.setState({mostrarRender: !this.state.mostrarRender})}>
                            {this.state.mostrarRender ? "Ocultar Renderizado" : "Mostrar Renderizado"}
                        </div>
                    </div>
                    <textarea
                        className={"writableTextArea paper backWheat" + (this.state.mostrarRender ? " hidden" : "")}
                        value={this.props.textAreaValue}
                        onChange={(e)=> {
                            e.target.style.height = e.target.scrollHeight+"px";
                            this.props.textAreaChange(e.target.value);
                        }}
                    >
                    </textarea>
                    <div className={"writableTextArea relative" + (this.state.mostrarRender ? "" : " hidden")}>
                        <div dangerouslySetInnerHTML={{__html: this.props.textAreaFinalRendering}} className={"listBoxing flex"}></div>
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

                <div className="flex flex1 padding16">
                    <div className="gearTextInputContainer colorMapa padding8 flex1 autoWidth flex">
                        <div className="flexRow relative">
                            <div className="flex1 autoHeight">
                                Lista de Monstruos
                            </div>
                            <div className="flex1 autoHeight">
                                Monstruos de la locacion
                            </div>
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <div className="messagesContainer personajesListContainer backgroundFuse">
                                    {filteredMonsters.map((monster, index)=>
                                        <div key={'monsterListGear' + monster.nombre + index}
                                            className="redish contentTitleBox hoverPoint"
                                            onClick={()=> {this.addBeast(monster.nombre)}}
                                        >
                                            <div className="contentTitleBoxTitle">
                                                {monster.nombre}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="loggerInputContainer">
                                    <input
                                        id="searchBar"
                                        type="text"
                                        className="searchBar"
                                        placeholder="Buscar Monstruo"
                                        value={this.state.bestiarySearchValue}
                                        onChange={(event)=> this.setState({bestiarySearchValue: event.target.value})}/>
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.monstruosAGuardar.map((monster, index)=> 
                                    <div key={'monsterRemovalShowList' + monster + index} className="relative gearAdderItemList redish paddingRight24">
                                        <div>
                                            {monster}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish" onClick={()=>this.removeBeast(index)}>X</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="gearTextInputContainer colorMapa padding8 flex1 autoWidth flex">
                        <div className="flexRow relative">
                            <div className="flex1 autoHeight">
                                Lista de NPCs
                            </div>
                            <div className="flex1 autoHeight">
                                NPCs de la locacion
                            </div>
                        </div>
                        <div className="flex1 relative flexRow">
                            <div className="fill flex1 relative">
                                <div className="messagesContainer personajesListContainer backgroundFuse">
                                    {filteredNpcs.map((npc, index)=>
                                        <div key={'npcListGear' + npc + index}
                                            className="yellowish contentTitleBox hoverPoint"
                                            onClick={()=> {this.addNpc(npc)}}
                                        >
                                            <div className="contentTitleBoxTitle">
                                                {npc}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="loggerInputContainer">
                                    <input
                                        id="searchBar"
                                        type="text"
                                        className="searchBar"
                                        placeholder="Buscar NPC"
                                        value={this.state.npcSearchValue}
                                        onChange={(event)=> this.setState({npcSearchValue: event.target.value})}/>
                                </div>
                            </div>
                            <div className="flex1 relative flexRow flexWrap padding8 fromStart">
                                {this.props.npcssAGuardar.map((npc, index)=> 
                                    <div key={'npcRemovalShowList' + npc + index} className="relative gearAdderItemList yellowish paddingRight24">
                                        <div>
                                            {npc}
                                        </div>
                                        <div className="botonAmpliar hoverPoint clickFeedback redish" onClick={()=>this.removeNpc(index)}>X</div>
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
