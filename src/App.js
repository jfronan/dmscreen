import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import configureStore from './configureStore';
import MainScreenContainer from './components/MainScreenContainer'
import { SERVER } from './Constants';

const store = configureStore();

window.addEventListener("beforeunload", (ev) => {  
    ev.preventDefault();
    fetch(SERVER + "cerrarApp");
});

class App extends Component {
  render() {
    return (
      <Provider store = { store } >
      <div className="App">
        <MainScreenContainer/>
      </div>
      </Provider>
    );
  }
}

export default App;
