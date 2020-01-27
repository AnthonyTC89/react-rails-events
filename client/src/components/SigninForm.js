import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Button } from 'react-bootstrap';
import { StyleRoot } from 'radium';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import login from '../redux/actions/login';
import logout from '../redux/actions/logout';
import loginStatus from '../redux/actions/loginStatus';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: '',
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { addSession, history } = this.props;
    const data = {
      user: {
        username: email,
        email,
        password,
        password_confirmation: password,
        status: 3,
      },
    };
    this.setState({
      btnLoading: true,
    });
    await axios.post('/api/v1/users', data)
      .then((response) => {
        this.setState({
          email: '',
          password: '',
          confirmation: '',
          btnLoading: false,
        });
        addSession(response.data);
        history.push('/dashboard');
      })
      .catch((error) => {
        if (error.response.status === 500) {
          this.setState({
            btnLoading: false,
            errors: ['Connection failed.', error.response.statusText],
          });
        } else {
          this.setState({
            btnLoading: false,
            errors: error.response.data,
          });
        }
      });
  }

  render() {
    const { email, password, confirmation, btnLoading, errors } = this.state;
    return (
      <StyleRoot>
        <form onSubmit={!btnLoading ? this.handleSubmit : null} style={animations.fadeIn}>
          <Image
            className="img-form"
            src="https://www.wtseo.co/wp-content/uploads/2019/11/vent-4.gif"
          />
          <h2>Sign up</h2>
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
          <input
            className="form-control"
            onChange={this.handleChange}
            type="password"
            placeholder="password confirmation"
            value={confirmation}
            name="confirmation"
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
            {btnLoading ? 'Loading…' : 'Sign in'}
          </Button>
          <div className="form-group">
            <Link to="/login">You already have an account, Login!</Link>
          </div>
        </form>
      </StyleRoot>
    );
  }
}

SigninForm.propTypes = {
  session: PropTypes.object.isRequired,
  addSession: PropTypes.func.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
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

const SigninWrapper = connect(mapStateToProps, mapDispatchToProps)(SigninForm);

export default SigninWrapper;
