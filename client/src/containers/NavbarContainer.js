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

  handleClick(Component) {
    const { changeDashboardTo } = this.props;
    changeDashboardTo(Component);
  }

  render() {
    const { session } = this.props;
    let NavAdmin = null; // status: 1 => Admin
    let NavSuperUser = null; // status: 2 => SuperUser
    if (session.isLoggedIn && session.user.status === 1) {
      NavAdmin = (
        <NavDropdown title="Admin" id="collasible-nav-dropdown">
          <NavDropdown.Item onClick={() => this.handleClick({ name: 'UsersContainer' })}>
            AllUsers
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => this.handleClick({ name: 'AllEventsContainer' })}>
            AllEvents
          </NavDropdown.Item>
        </NavDropdown>
      );
    }
    if (session.isLoggedIn && (session.user.status === 1 || session.user.status === 2)) {
      NavSuperUser = (
        <NavDropdown title="SuperUser" id="collasible-nav-dropdown">
          <NavDropdown.Item onClick={() => this.handleClick({ name: 'EventForm' })}>
            Create Events
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => this.handleClick({ name: 'MyEventsContainer' })}>
            My Events
          </NavDropdown.Item>
        </NavDropdown>
      );
    }

    return (
      <Navbar collapseOnSelect expand="sm" bg="secondary" variant="dark">
        <Navbar.Brand>Agenda</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => this.handleClick({ name: 'UpcomingEventsContainer' })}>
              Home
            </Nav.Link>
            <Nav.Link onClick={() => this.handleClick({ name: 'ProfileForm' })}>
              Profile
            </Nav.Link>
            <Nav.Link onClick={this.handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        {NavAdmin}
        {NavSuperUser}
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
  changeDashboardTo: (Component) => dispatch(updateDashboard(Component)),
});

const NavbarWrapper = connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);

export default NavbarWrapper;
