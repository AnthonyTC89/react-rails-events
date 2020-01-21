import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';

class DashboardMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
  }

  handleClick(e) {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    // const { showPage } = this.props;
    console.log(e.target.name);
    // showPage(e.target.name);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            Profile
            <Image
              onClick={this.handleClick}
              name="profile"
              src="https://picsum.photos/seed/picsum/150"
              roundedCircle
            />
          </div>
          <div className="col-6">
            Events
            <Image
              onClick={this.handleClick}
              name="events"
              src="https://picsum.photos/seed/picsum/150"
              roundedCircle
            />
          </div>
        </div>
      </div>
    );
  }
}

DashboardMenu.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   session: state.session,
// });

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const DashboardMenuWrapper = connect(null, mapDispatchToProps)(DashboardMenu);

export default DashboardMenuWrapper;
