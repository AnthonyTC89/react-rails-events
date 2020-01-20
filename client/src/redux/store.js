import { createStore, combineReducers } from 'redux';
import session from './reducers/session';

const reducer = combineReducers({
  session,
});

const store = createStore(reducer);

export default store;
