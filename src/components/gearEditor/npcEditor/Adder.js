import React from 'react';
import Dropzone from 'react-dropzone';
import {capitalizeEveryWord} from '../../../utils/Utils';

export default class Adder extends React.Component {

  constructor(props) {
    super();
    this.state = {
        mostrarRender: false
    }
  }

  render() {
    return (
        <div className="fill flex relative">
            <div className="fill paddingBottom64 relative flexRow">
                <div className="flexRow flex1 padding16 flexWrap fromStart">
                    <div className="gearTextInputContainer yellowish padding8">
                        <div>
                            Nombre
                        </div>
                        <div>
                            <input
                                type="text"
                                value={this.props.nombreNPC}
                                onChange={(e)=> {
                                    this.props.textAreaTitleChange(capitalizeEveryWord(e.target.value));
                                }}
                                className="gearTextInputWriteZone Luminari"
                                maxLength="64"
                            />
                        </div>
                    </div>
                    <div className="gearTextInputContainer yellowish padding8 hoverPoint clickFeedback button">
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
                    Esta Imagen estara al final del contenido que se mostrara sobre el npc
                </div>
            </div>
        </div>
    );
  }
}
