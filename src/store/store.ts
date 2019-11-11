import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, AppState } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const configureStore = (preloadedStore?: AppState) => createStore(
  rootReducer,
  preloadedStore,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

export default configureStore;
