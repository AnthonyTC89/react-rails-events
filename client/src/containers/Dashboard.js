/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarContainer from './NavbarContainer';
import loginStatus from '../redux/actions/loginStatus';
import updateDashboard from '../redux/actions/updateDashboard';

class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  componentWillUnmount() {
    const { changeDashboardTo } = this.props;
    changeDashboardTo('default');
  }

  render() {
    const { session, dashboard } = this.props;
    if (!session.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    const { Component, arg } = dashboard;
    return (
      <div>
        <NavbarContainer />
        <Component arg={arg} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  changeDashboardTo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
  changeDashboardTo: (name) => dispatch(updateDashboard(name)),
});

const DashboardWrapper = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardWrapper;
