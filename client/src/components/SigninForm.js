import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import login from '../redux/actions/login';


import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmation: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { addSession } = this.props;
    const data = {
      user: {
        username: email,
        email,
        password,
        password_confirmation: password,
        status: 2,
      },
    };
    axios.post('/api/v1/users', data)
      .then((response) => {
        this.setState({
          email: '',
          password: '',
          confirmation: '',
        });
        addSession(response.data);
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  render() {
    const { email, password, confirmation } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Sign in</button>
        <div className="form-group">
          <Link to="/login">Login</Link>
        </div>
      </form>
    );
  }
}

SigninForm.propTypes = {
  addSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  addSession: (user) => dispatch(login(user)),
});

const SigninWrapper = connect(mapStateToProps, mapDispatchToProps)(SigninForm);

export default SigninWrapper;
