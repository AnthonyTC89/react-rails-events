import { createStore, combineReducers } from 'redux';
import session from './reducers/session';
import dashboardReducer from './reducers/dashboardReducer';

const reducer = combineReducers({
  session,
  dashboardReducer,
});

const store = createStore(reducer);

export default store;
