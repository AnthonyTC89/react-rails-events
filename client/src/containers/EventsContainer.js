import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventInfo from '../components/EventInfo';

class EventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
    this.getAllEvents = this.getAllEvents.bind(this);
    this.setStateDeafult = this.setStateDeafult.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus, arg } = this.props;
    checkLoginStatus();
    switch (arg) {
      case 'All':
        this.getAllEvents();
        break;
      default:
        this.setStateDeafult();
    }
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

EventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  arg: PropTypes.string,
};

EventsContainer.defaultProps = {
  arg: 'All',
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const EventsWrapper = connect(mapStateToProps, mapDispatchToProps)(EventsContainer);

export default EventsWrapper;
