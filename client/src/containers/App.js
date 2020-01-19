/* eslint-disable object-curly-newline */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginForm from '../components/LoginForm';
import SigninForm from '../components/SigninForm';
import store from '../redux/store';
import './App.css';

class App extends React.Component {
  handleLogin(data) {
    this.setState({
      isLoggedIn: true,
      user: data.user,
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      user: {},
    });
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/sign_in" component={SigninForm} />
            <Redirect from="/" to="/login" />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
