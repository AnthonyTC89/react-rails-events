import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import LoginWrapper from '../components/LoginForm';
import SigninWrapper from '../components/SigninForm';
import DashboardWrapper from './Dashboard';
import './App.css';

const App = () => (
  <div className="App-container">
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginWrapper} />
          <Route path="/sign_in" component={SigninWrapper} />
          <Route path="/dashboard" component={DashboardWrapper} />
          <Redirect from="/" to="/login" />
        </Switch>
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
