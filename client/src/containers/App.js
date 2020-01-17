import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import './App.css';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <Route path="/sign_in" component={SigninForm} />
    </Switch>
  </BrowserRouter>
);

export default App;
