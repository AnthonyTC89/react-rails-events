import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <input
          className="form-control"
          onChange={this.handleChange}
          type="text"
          placeholder="email"
          value={email}
          name="email"
        />
        <input
          className="form-control"
          onChange={this.handleChange}
          type="password"
          placeholder="password"
          value={password}
          name="password"
        />
        <button type="submit">Login</button>
        <div className="form-group">
          <Link to="/sign_in">Sign up</Link>
        </div>
      </form>
    );
  }
}
export default LoginForm;
