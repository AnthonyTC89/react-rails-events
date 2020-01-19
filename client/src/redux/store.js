import { createStore, combineReducers } from 'redux';
import reducerSession from './reducers/sessions';

const reducer = combineReducers({
  reducerSession,
});

const store = createStore(reducer);

export default store;
