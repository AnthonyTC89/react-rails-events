/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logout from '../redux/actions/logout';
import loginStatus from '../redux/actions/loginStatus';
import updateDashboard from '../redux/actions/updateDashboard';

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  handleLogout(e) {
    e.preventDefault();
    const { closeSession } = this.props;
    closeSession();
  }

  handleClick(name) {
    const { changeDashboardTo } = this.props;
    changeDashboardTo(name);
  }

  render() {
    const { session } = this.props;
    let NavAllUsers = null;
    let NavAllEvents = null;
    if (session.isLoggedIn && session.user.status === 1) {
      NavAllUsers = <NavDropdown.Item onClick={() => this.handleClick('UsersContainer')}>AllUsers</NavDropdown.Item>;
      NavAllEvents = <NavDropdown.Item onClick={() => this.handleClick('EventsContainerAll')}>AllEvents</NavDropdown.Item>;
    }
    let NavSuperUser = null;
    if (session.isLoggedIn && (session.user.status === 1 || session.user.status === 2)) {
      NavSuperUser = <Nav.Link onClick={() => this.handleClick('EventForm')}>Create Events</Nav.Link>;
    }
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand onClick={() => this.handleClick('DashboardMenu')}>
          Dashboard /
          {session.user.username}
        </Navbar.Brand>
        {NavSuperUser}
        <NavDropdown title="Account" id="collasible-nav-dropdown">
          {NavAllUsers}
          {NavAllEvents}
          <NavDropdown.Item onClick={() => this.handleClick('ProfileForm')}>Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#Home">Home</Nav.Link>
            <Nav.Link href="#Home">Events</Nav.Link>
            <Nav.Link href="#MyEvents">My Events</Nav.Link>
            <Nav.Link href="#Attendees">Attendees</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavbarContainer.propTypes = {
  session: PropTypes.object.isRequired,
  closeSession: PropTypes.func.isRequired,
  checkLoginStatus: PropTypes.func.isRequired,
  changeDashboardTo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  closeSession: (user) => dispatch(logout(user)),
  checkLoginStatus: () => dispatch(loginStatus()),
  changeDashboardTo: (name) => dispatch(updateDashboard(name)),
});

const NavbarWrapper = connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);

export default NavbarWrapper;
