import { combineReducers } from 'redux';
import mainReducer from './MainReducer';
import mapReducer from './MapReducer';
import combatReducer from './CombatReducer';
import gearReducer from './GearReducer';

const rootReducer = combineReducers({
    main: mainReducer,
    map: mapReducer,
    combat: combatReducer,
    gear: gearReducer
});

export default rootReducer;
  