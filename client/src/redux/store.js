import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import dashboard from './reducers/dashboard';

const reducer = combineReducers({
  session,
  dashboard,
});

const store = createStore(reducer);

export default store;
