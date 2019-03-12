import { combineReducers } from 'redux';
import mainReducer from './MainReducer';
import mapReducer from './MapReducer';

const rootReducer = combineReducers({
    main: mainReducer,
    map: mapReducer
});

export default rootReducer;
  