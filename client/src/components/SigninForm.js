import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
    const data = {
      user: {
        name: 'default',
        email,
        encrypted_password: password,
        status: 2,
      },
    };
    console.log(data);
    axios.post('/api/v1/users', data)
      .then((response) => {
        console.log(response);
        this.setState({
          email: '',
          password: '',
          confirmation: '',
        });
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
export default SigninForm;
