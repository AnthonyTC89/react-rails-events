import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventInfo from '../components/EventInfo';

class AllEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getAllEvents();
  }

  setStateDeafult() {
    this.setState({
      events: [],
    });
  }

  getAllEvents() {
    axios.get('/api/v1/events', { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  render() {
    const { events } = this.state;
    return (
      <div className="container">
        {events.map((event) => <EventInfo key={event.id} event={event} />)}
      </div>
    );
  }
}

AllEventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  // session: PropTypes.object.isRequired,
};

AllEventsContainer.defaultProps = {

};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const AllEventsWrapper = connect(mapStateToProps, mapDispatchToProps)(AllEventsContainer);

export default AllEventsWrapper;