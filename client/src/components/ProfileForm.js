/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import uuidv4 from 'uuid/v4';
import { Image, Button } from 'react-bootstrap';
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
      btnUpdateLoading: false,
      btnUpgradeLoading: false,
      errors: [],
      messages: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpgrade = this.handleUpgrade.bind(this);
    this.upgradeUser = this.upgradeUser.bind(this);
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

  async upgradeUser(user) {
    const { updateUserSession } = this.props;
    return axios.put(`api/v1/users/${user.id}`, { user }, { withCredentials: true })
      .then((response) => {
        const msg = response.data.status === 4
          ? 'Request sent.'
          : 'Account updated.';
        this.setState({
          username: response.data.username,
          password: '',
          confirmation: '',
          status: response.data.status,
          btnUpdateLoading: false,
          btnUpgradeLoading: false,
          errors: [],
          messages: [msg],
        });
        updateUserSession(response.data);
      })
      .catch((error) => {
        this.setState({
          btnUpdateLoading: false,
          btnUpgradeLoading: false,
          errors: [],
          messages: ['Connection failed.', error.response.statusText],
        });
      });
  }

  async handleUpgrade() {
    const { session } = this.props;
    const { id, username, email, password, confirmation } = session.user;
    const user = {
      id,
      username,
      email,
      password,
      password_confirmation: confirmation,
      status: 4,
    };
    this.setState({
      btnUpgradeLoading: true,
    });
    await this.upgradeUser(user);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { id, username, email, password, confirmation, status } = this.state;
    if (password !== confirmation) {
      this.setState({
        errors: ['Password confirmation wrong.'],
      });
      return;
    }
    const user = {
      id,
      username,
      email,
      password,
      password_confirmation: confirmation,
      status,
    };
    this.setState({
      btnUpdateLoading: true,
    });
    await this.upgradeUser(user);
  }

  render() {
    const { username, email, password, confirmation, status,
      btnUpdateLoading, btnUpgradeLoading, errors, messages } = this.state;
    const hash = CryptoJS.MD5(email);
    const url = `http://www.gravatar.com/avatar/${hash}`;
    const gravatar = 'https://en.gravatar.com/site/login';
    const btnUpgrade = status === 3 ? (
      <Button
        type="button"
        variant="secondary"
        disabled={btnUpgradeLoading}
        onClick={!btnUpgradeLoading ? this.handleUpgrade : null}
        size="lg"
        block
      >
        {btnUpgradeLoading ? 'Loading…' : 'Upgrade Account'}
      </Button>
    ) : null;

    return (
      <form onSubmit={!btnUpdateLoading ? this.handleSubmit : null}>
        <a href={gravatar} target="_blank" rel="noopener noreferrer">
          <Image className="img-profile" src={url} roundedCircle />
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
        <ul className="text-success">
          {messages.map((msg) => <li key={uuidv4()}><small>{msg}</small></li>)}
        </ul>
        <ul className="text-danger">
          {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
        </ul>
        <Button type="submit" variant="primary" disabled={btnUpdateLoading}>
          {btnUpdateLoading ? 'Loading…' : 'Update'}
        </Button>
        {btnUpgrade}
      </form>
    );
  }
}

ProfileForm.propTypes = {
  session: PropTypes.object.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  updateUserSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
  updateUserSession: (user) => dispatch(updateSession(user)),
});

const ProfileWrapper = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

export default ProfileWrapper;
