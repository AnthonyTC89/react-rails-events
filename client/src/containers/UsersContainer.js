import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import UserInfo from '../components/UserInfo';

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.getUsersDB = this.getUsersDB.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getUsersDB();
  }

  getUsersDB() {
    axios.get('/api/v1/users', { withCredentials: true })
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  render() {
    const { users } = this.state;
    return (
      <div className="container">
        {users.map((user) => <UserInfo key={user.id} user={user} />)}
      </div>
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
