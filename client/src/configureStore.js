import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer
    }),
    composeEnhancers(applyMiddleware(...middleware))
  );
  return store;
};
