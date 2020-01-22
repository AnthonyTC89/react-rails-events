/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Image } from 'react-bootstrap';
import loginStatus from '../redux/actions/loginStatus';
import updateSession from '../redux/actions/updateSession';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    const { session } = props;
    this.state = {
      id: session.user.id,
      username: session.user.username,
      email: session.user.email,
      password: '',
      confirmation: '',
      status: session.user.status,
      // errors: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    const { updateUser } = this.props;
    const { id, username, email, password, confirmation, status } = this.state;
    const user = {
      id,
      username,
      email,
      password,
      password_confirmation: confirmation,
      status,
    };
    axios.put(`api/v1/users/${user.id}`, { user }, { withCredentials: true })
      .then((response) => {
        this.setState({
          password: '',
          confirmation: '',
          // errors: '',
        });
        updateUser(response.data);
      })
      .catch((error) => console.log('api errors: ', error));
  }

  render() {
    const { username, email, password, confirmation } = this.state;
    const hash = CryptoJS.MD5(email);
    const url = `http://www.gravatar.com/avatar/${hash}`;
    const gravatar = 'https://en.gravatar.com/site/login';
    return (
      <form onSubmit={this.handleSubmit}>
        <a href={gravatar} target="_blank" rel="noopener noreferrer">
          <Image src={url} roundedCircle />
        </a>
        <input
          className="form-control"
          onChange={this.handleChange}
          type="text"
          placeholder="email"
          value={username}
          name="username"
          required
        />
        <input
          className="form-control"
          type="text"
          placeholder="email"
          value={email}
          name="email"
          required
          disabled
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
        <button type="submit">Update</button>
      </form>
    );
  }
}
ProfileForm.propTypes = {
  session: PropTypes.object.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
  updateUser: (user) => dispatch(updateSession(user)),
});

const ProfileWrapper = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

export default ProfileWrapper;
