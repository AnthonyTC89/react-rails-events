/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import logout from '../redux/actions/logout';
import loginStatus from '../redux/actions/loginStatus';

class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
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

  render() {
    const { session } = this.props;
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Brand>
          Dashboard /
          {session.user.username}
        </Navbar.Brand>
        <NavDropdown title="Account" id="collasible-nav-dropdown">
          <NavDropdown.Item>Profile</NavDropdown.Item>
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
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  closeSession: (user) => dispatch(logout(user)),
  checkLoginStatus: () => dispatch(loginStatus()),
});

const NavbarWrapper = connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);

export default NavbarWrapper;
