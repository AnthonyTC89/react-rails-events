/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import loginStatus from '../redux/actions/loginStatus';
import NavbarContainer from '../components/NavbarContainer';

class Dashboard extends React.Component {
  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  render() {
    const { session } = this.props;
    if (!session.isLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <NavbarContainer />
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
