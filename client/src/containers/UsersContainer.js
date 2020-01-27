import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import loginStatus from '../redux/actions/loginStatus';
import UserCard from '../components/UserCard';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      messages: [],
      errors: [],
    };
    this.getUsersDB = this.getUsersDB.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getUsersDB();
  }

  getUsersDB() {
    this.setState({
      isLoading: true,
      messages: [],
      errors: [],
    });
    axios.get('/api/v1/users', { withCredentials: true })
      .then((response) => {
        this.setState({
          users: response.data,
          isLoading: false,
          messages: [],
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          users: [],
          isLoading: false,
          messages: [],
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  async handleUpgrade(user) {
    this.setState({
      isLoading: true,
      messages: [],
      errors: [],
    });
    // eslint-disable-next-line no-param-reassign
    user.status = 2;
    await axios.put(`api/v1/users/${user.id}`, { user }, { withCredentials: true })
      .then((response) => {
        this.setState({
          isLoading: false,
          errors: [],
          messages: ['Account upgraded.', response.statusText],
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          errors: ['Connection failed.', error.response.statusText],
          messages: [],
        });
      });
  }

  async handleDelete(id) {
    this.setState({
      isLoading: true,
      messages: [],
      errors: [],
    });
    await axios.delete(`api/v1/users/${id}`, { withCredentials: true })
      .then(() => {
        this.setState({
          isLoading: false,
          errors: ['User deleted.'],
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  render() {
    const { users, messages, errors, isLoading } = this.state;
    return (
      <StyleRoot>
        <div className="container" style={animations.fadeInRight}>
          <h3>All Users</h3>
          {isLoading ? <Spinner animation="border" /> : null}
          <ul className="text-success">
            {messages.map((msg) => <li key={uuidv4()}><small>{msg}</small></li>)}
          </ul>
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          {users.map((user) => (
            <div key={uuidv4()} className="row">
              <UserCard user={user} />
              {user.status === 4
                ? (
                  <Button
                    variant="info"
                    onClick={() => this.handleUpgrade(user)}
                  >
                    ↑
                  </Button>
                )
                : null}
              <Button variant="danger" onClick={() => this.handleDelete(user.id)}>
                x
              </Button>
            </div>
          ))}
        </div>
      </StyleRoot>
    );
  }
}

UsersContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const UsersWrapper = connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default UsersWrapper;
