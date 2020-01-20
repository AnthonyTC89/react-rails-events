/* eslint-disable object-curly-newline */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginWrapper from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import store from '../redux/store';
import './App.css';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginWrapper} />
        <Route path="/sign_in" component={SigninForm} />
        <Redirect from="/" to="/sign_in" />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
