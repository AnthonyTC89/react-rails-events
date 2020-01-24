/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';

class UpcomingEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      joinEvents: [],
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getUpcomingEvents();
    this.getJoinEvents();
  }

  setStateDeafult() {
    this.setState({
      events: [],
    });
  }

  getUpcomingEvents() {
    const params = { date: new Date() };
    axios.get('/api/v1/events', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  getJoinEvents() {
    const { session } = this.props;
    const params = {
      user_id: session.user.id,
    };
    axios.get('/api/v1/attendees', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          joinEvents: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  handleJoinEvent(event_id) {
    const { session } = this.props;
    const { joinEvents } = this.state;
    const params = {
      user_id: session.user.id,
      event_id,
      status: 1,
    };
    axios.post('/api/v1/attendees', params)
      .then(() => {
        this.setState({
          joinEvents: [...joinEvents, event_id],
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  handleLeaveEvent(event_id) {
    const { session } = this.props;
    const { joinEvents } = this.state;
    const params = {
      user_id: session.user.id,
      event_id,
    };
    axios.delete('/api/v1/attendees/leave', { params })
      .then(() => {
        this.setState({
          joinEvents: joinEvents.filter((eventID) => eventID !== event_id),
        });
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  }

  render() {
    const { events, joinEvents } = this.state;
    return (
      <div className="container">
        {events.map((event) => (
          <div key={event.id}>
            <EventCard event={event} />
            {
              joinEvents.includes(event.id)
                ? <Button onClick={() => this.handleLeaveEvent(event.id)}>Leave</Button>
                : <Button onClick={() => this.handleJoinEvent(event.id)}>Join</Button>
            }
          </div>
        ))}
      </div>
    );
  }
}

UpcomingEventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
});

const UpcomingEventsWrapper = connect(mapStateToProps, mapDispatchToProps)(UpcomingEventsContainer);

export default UpcomingEventsWrapper;
