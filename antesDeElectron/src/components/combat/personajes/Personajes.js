import React from 'react';
import '../../../App.css';
import './Personajes.css';
import { capitalizeWord } from '../../../utils/Utils';

export default class Personajes extends React.Component {

  constructor(props) {
    super();
    this.state = {
        pageShowing: 'bestiary'
    }
  }

  componentDidMount() {
    this.props.cargarPersonajes();
  }

  render() {
    return (
      <div id="personajesContainer" className="flex fill">
        <div id="buttonRow" className="buttonRow">
            <div className="flex1 tabButton redish hoverPoint" onClick={()=> this.setState({pageShowing: "bestiary"})}>Bestiario</div>
            <div className="flex1 tabButton greenish hoverPoint" onClick={()=> this.setState({pageShowing: "pcs"})}>Jugadores</div>
            <div className="flex1 tabButton colorMapa hoverPoint" onClick={()=> this.setState({pageShowing: "area"})}>Area Actual</div>
        </div>

        {(() => {
            switch(this.state.pageShowing) {
            case 'bestiary':
                return (
                    <div className="fill">
                        <div className="messagesContainer personajesListContainer backgroundFuse">
                            {this.props.bestiario.map((monstruo)=> 
                                <div className="redish contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(monstruo.nombre)}>
                                        {monstruo.nombre}
                                    </div>
                                    <div className="botonAmpliar hoverPoint clickFeedback yellowish"
                                        onClick={()=>this.props.agregarAListaDeTurnos(monstruo)}>
                                        ➜
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="loggerInputContainer">
                            <input id="searchBar" type="text" className="searchBar" placeholder="Buscar Monstruo"/>
                        </div>
                    </div>
                );
            case 'pcs':
                return (
                    <div className="fill">
                        <div className="listBoxing personajesListContainer">
                            {this.props.pcs.map((personaje)=> 
                                <div className="greenish contentTitleBox hoverPoint">
                                    <div className="contentTitleBoxTitle" onClick={()=> this.props.mostrarDetalles(personaje.nombre)}>
                                        {personaje.nombre}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'area':
                return (<div className="fill">En construccion</div>);
            default:
                return null;
            }
        })()}
      </div>
    );
  }
}
