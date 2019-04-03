import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import MainScreenContainer from './components/MainScreenContainer'

const store = configureStore();

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
