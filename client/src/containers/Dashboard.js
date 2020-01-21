/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginStatus from '../redux/actions/loginStatus';

class Dashboard extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    const { session } = this.props;
    return (
      <div>
        {session.isLoggedIn ? <Redirect from="/dashboard" to="/login" /> : null}
        hola que hace
        {/* <Navbar />
        <LastEvents />
        <MenuIcons /> */}
      </div>
    );
  }
}

Dashboard.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const DashboardWrapper = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardWrapper;