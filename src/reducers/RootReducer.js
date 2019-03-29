import { combineReducers } from 'redux';
import mainReducer from './MainReducer';
import mapReducer from './MapReducer';
import combatReducer from './CombatReducer';

const rootReducer = combineReducers({
    main: mainReducer,
    map: mapReducer,
    combat: combatReducer
});

export default rootReducer;
  