import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/RootReducer';

export default function configureStore(preloadedState) {
  const composeEnhancers = compose;

  return createStore(rootReducer,
    compose(
      composeEnhancers(applyMiddleware(thunkMiddleware))
    )
  );

}
