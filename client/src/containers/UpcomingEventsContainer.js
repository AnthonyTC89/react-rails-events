/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';
import ToogleSwitch from '../components/ToogleSwitch';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';
import './EventContainer.css';

class UpcomingEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      joinEvents: [],
      filter: false,
      errors: [],
    };
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getUpcomingEvents();
    this.getJoinEvents();
  }

  getUpcomingEvents() {
    const params = { date: new Date() };
    axios.get('/api/v1/events', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
        });
      });
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
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
        });
      });
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
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
        });
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
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  handleSwitch() {
    const { filter } = this.state;
    this.setState({
      filter: !filter,
    });
  }

  render() {
    const { events, joinEvents, filter, errors } = this.state;
    return (
      <StyleRoot>
        <div className="container" style={animations.fadeInUp}>
          <h3>UPCOMING EVENTS</h3>
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          <ToogleSwitch onChange={this.handleSwitch} onSwitch={filter} textRight="Joined events " />
          {events.map((event) => {
            if (filter && !joinEvents.includes(event.id)) {
              return null;
            }
            return (
              <div key={event.id} className="row">
                <EventCard event={event} />
                {
                  joinEvents.includes(event.id)
                    ? <Button variant="danger" onClick={() => this.handleLeaveEvent(event.id)}>-</Button>
                    : <Button variant="info" onClick={() => this.handleJoinEvent(event.id)}>+</Button>
                }
              </div>
            );
          })}
        </div>
      </StyleRoot>
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
