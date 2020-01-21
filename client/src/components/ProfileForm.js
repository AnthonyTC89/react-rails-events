/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import axios from 'axios';
import loginStatus from '../redux/actions/loginStatus';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    const { session } = props;
    this.state = {
      username: session.user.username,
      email: session.user.email,
      password: '',
      confirmation: '',
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
    // const { addSession, history } = this.props;
    const { username, email, password, confirmation } = this.state;
    const user = {
      username,
      email,
      password,
      password_confirmation: confirmation,
    };
    console.log(user);
    this.setState({
      username,
      email,
      password: '',
      confirmation: '',
      // errors: '',
    });
    // axios.post('api/v1/login', { user }, { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.logged_in) {
    //       addSession(response.data.user);
    //       history.push('/dashboard');
    //     } else {
    //       this.setState({
    //         errors: response.data.errors,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log('api errors: ', error));
  }

  render() {
    const { username, email, password, confirmation } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
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
        <button type="submit">Update</button>
      </form>
    );
  }
}
ProfileForm.propTypes = {
  session: PropTypes.object.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const ProfileWrapper = connect(mapStateToProps, mapDispatchToProps)(ProfileForm);

export default ProfileWrapper;
