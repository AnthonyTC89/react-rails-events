/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginStatus from '../redux/actions/loginStatus';
import NavbarContainer from './NavbarContainer';

class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    const { session, dashboardState } = this.props;
    if (!session.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavbarContainer />
        <dashboardState.name />
      </div>
    );
  }
}

Dashboard.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  dashboardState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  dashboardState: state.dashboardReducer,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const DashboardWrapper = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardWrapper;
