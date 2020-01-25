/* eslint-disable object-curly-newline */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';
import { Image, Button } from 'react-bootstrap';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import login from '../redux/actions/login';
import logout from '../redux/actions/logout';
import loginStatus from '../redux/actions/loginStatus';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';
import animations from '../animations';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'ptonyptc@gmail.com',
      password: '1234',
      btnLoading: false,
      errors: [],
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

  componentWillUnmount() {
    this.setState({
      btnLoading: true,
      errors: [],
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { addSession, history } = this.props;
    const { email, password } = this.state;
    const user = { email, password };
    this.setState({
      btnLoading: true,
    });
    await axios.post('api/v1/login', { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
          addSession(response.data.user);
          history.push('/dashboard');
        } else {
          this.setState({
            btnLoading: false,
            errors: [response.data.errors],
            password: '',
          });
        }
      })
      .catch((error) => {
        this.setState({
          btnLoading: false,
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  render() {
    const { email, password, errors, btnLoading } = this.state;
    return (
      <StyleRoot>
        <form onSubmit={!btnLoading ? this.handleSubmit : null} style={animations.fadeIn}>
          <Image
            className="img-form"
            src="https://www.wtseo.co/wp-content/uploads/2019/11/event3.gif"
          />
          <h2>Login</h2>
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
          <ul className="text-danger">
            {errors.map((e) => <li key={uuidv4()}><small>{e}</small></li>)}
          </ul>
          <Button
            type="submit"
            variant="primary"
            disabled={btnLoading}
          >
            {btnLoading ? 'Loading…' : 'Login'}
          </Button>
          <div className="form-group">
            <Link to="/sign_in">Don&apos;t have and account, Sign up!</Link>
          </div>
        </form>
      </StyleRoot>
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
