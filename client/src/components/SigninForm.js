import React from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({
      email: '',
      password: '',
      confirmation: '',
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
        />
        <input
          className="form-control"
          onChange={this.handleChange}
          type="password"
          placeholder="password"
          value={password}
          name="password"
        />
        <input
          className="form-control"
          onChange={this.handleChange}
          type="password"
          placeholder="password confirmation"
          value={confirmation}
          name="confirmation"
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
