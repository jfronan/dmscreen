import React from 'react';
import '../../App.css';

export default class LogWindow extends React.Component {

  constructor(props) {
    super();
    this.state = {
        text: ''
    }
    this.changeText = this.changeText.bind(this);
    this.addEnterListener = this.addEnterListener.bind(this);
    this.removeEnterListener = this.removeEnterListener.bind(this);
    this.enterKeyFunction = this.enterKeyFunction.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  componentDidMount() {
    this.props.traerLogsGuardados();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    var inputElem = document.getElementById("messagesContainer");
    inputElem.scrollTo(0, inputElem.scrollHeight);
  }

  changeText(input) {
    this.setState({text: input})
  }

  enterKeyFunction(event) {
    if(event.keyCode === 13 && this.state.text !== '' && this.state.text !== null) {
        this.props.enviarMensaje(this.state.text);
        this.setState({text: ''});
    }
  }

  addEnterListener() {
    document.addEventListener("keydown", this.enterKeyFunction, false);
  }
  removeEnterListener(){
    document.removeEventListener("keydown", this.enterKeyFunction, false);
  }

  render() {
    return (
      <div className="fill relative">
        <div id="messagesContainer" className="messagesContainer">
            {this.props.messages.map((message)=> {
                return (
                <span className="loggerMessage">
                    [{message.dateTime}]: {message.text}
                    <br/>
                </span>
                )
            })}
        </div>
        <div id="loggerInputContainer" className="loggerInputContainer">
            <input
                type="text"
                value={this.state.text}
                onChange={(e)=>this.changeText(e.target.value)}
                onFocus={()=> this.addEnterListener()}
                onBlur={()=> this.removeEnterListener()}
            />
        </div>
      </div>
    );
  }
}
