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
  }

  componentDidMount() {
    const { checkLoginStatus, session, history } = this.props;
    checkLoginStatus();
    if (session.isLoggedIn) {
      history.push('/dashboard');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addSession, history } = this.props;
    const { email, password } = this.state;
    const user = { email, password };

    axios.post('api/v1/login', { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          addSession(response.data.user);
          history.push('/dashboard');
        } else {
          this.setState({
            errors: response.data.errors,
          });
        }
      })
      .catch((error) => console.log('api errors: ', error));
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
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
          {/* <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> */}
          <span>{errors}</span>
        </div>
        <div className="form-group">
          <Link to="/sign_in">Sign up</Link>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  addSession: PropTypes.func.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
