/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';
import ToogleSwitch from '../components/ToogleSwitch';

class UpcomingEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      joinEvents: [],
      filter: false,
    };
    this.handleSwitch = this.handleSwitch.bind(this);
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

  handleSwitch() {
    const { filter } = this.state;
    this.setState({
      filter: !filter,
    });
  }

  render() {
    const { events, joinEvents, filter } = this.state;
    return (
      <div className="container">
        <ToogleSwitch onChange={this.handleSwitch} onSwitch={filter} textRight="Joined events " />
        {events.map((event) => {
          if (filter && !joinEvents.includes(event.id)) {
            return null;
          }
          return (
            <div key={event.id}>
              <EventCard event={event} />
              {
                joinEvents.includes(event.id)
                  ? <Button onClick={() => this.handleLeaveEvent(event.id)}>Leave</Button>
                  : <Button onClick={() => this.handleJoinEvent(event.id)}>Join</Button>
              }
            </div>
          );
        })}
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
