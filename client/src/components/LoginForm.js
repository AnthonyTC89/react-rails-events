/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import login from '../redux/actions/login';
import logout from '../redux/actions/logout';
import loginStatus from '../redux/actions/loginStatus';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleLogout(e) {
    e.preventDefault();
    const { session, closeSession } = this.props;
    const { user } = session;
    closeSession(user);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addSession } = this.props;
    const { email, password } = this.state;
    const user = { email, password };

    axios.post('api/v1/login', { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          console.log('LOGIN-DATA: ', response.data);
          addSession(response.data.user);
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch((error) => console.log('api errors: ', error));
  }

  render() {
    const { session } = this.props;
    const { email, password, errors } = this.state;
    console.log('session: ', session);
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {session.user.username}
        <input
          className="form-control"
          onChange={this.handleChange}
          type="text"
          placeholder="email"
          value={email}
          name="email"
          required
        />
        <input
          className="form-control"
          onChange={this.handleChange}
          type="password"
          placeholder="password"
          value={password}
          name="password"
          required
        />
        <button type="submit">Login</button>
        <div className="form-group">
          <span>{errors}</span>
        </div>
        <div className="form-group">
          <Link to="/sign_in">Sign up</Link>
          {session.isLoggedIn ? <Link onClick={this.handleLogout} to="/logout">Logout</Link> : null}
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  addSession: PropTypes.func.isRequired,
  closeSession: PropTypes.func.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  addSession: (user) => dispatch(login(user)),
  closeSession: (user) => dispatch(logout(user)),
  checkLoginStatus: () => dispatch(loginStatus()),
});

const LoginWrapper = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export default LoginWrapper;
