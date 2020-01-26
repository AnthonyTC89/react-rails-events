import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavbarContainer from './NavbarContainer';
import loginStatus from '../redux/actions/loginStatus';

class Dashboard extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    const { session, dashboard } = this.props;
    if (!session.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    const { NameComponent, arg } = dashboard.Component;
    return (
      <div>
        <NavbarContainer />
        <NameComponent arg={arg} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  dashboard: state.dashboard,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const DashboardWrapper = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardWrapper;
