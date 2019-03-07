import { combineReducers } from 'redux';
import mapaReducer from './MapaReducer';

const rootReducer = combineReducers({
    mapa: mapaReducer,
});

export default rootReducer;
  