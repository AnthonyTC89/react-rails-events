import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleRoot } from 'radium';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class EventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnLoading: false,
      attendee: null,
      messages: [],
      errors: [],
      event: props.arg,
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    this.getAttendee();
  }

  async getAttendee() {
    const { session } = this.props;
    const { event } = this.state;
    const params = {
      user_id: session.user.id,
      event_id: event.id,
    };
    this.setState({
      btnLoading: true,
      messages: [],
      errors: [],
    });
    await axios.get('/api/v1/attendees', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          attendee: response.data,
          errors: [],
          btnLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          btnLoading: false,
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  async handleJoinEvent() {
    const { session } = this.props;
    const { event } = this.state;
    const params = {
      user_id: session.user.id,
      event_id: event.id,
      status: 1,
    };
    this.setState({
      btnLoading: true,
      messages: [],
      errors: [],
    });
    await axios.post('/api/v1/attendees', params)
      .then((response) => {
        this.setState({
          attendee: response.data,
          btnLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
          btnLoading: false,
        });
      });
  }

  async handleLeaveEvent() {
    const { attendee } = this.state;
    this.setState({
      messages: [],
      errors: [],
      btnLoading: true,
    });
    await axios.delete(`/api/v1/attendees/${attendee.id}`)
      .then(() => {
        this.setState({
          btnLoading: false,
          attendee: null,
        });
      })
      .catch((error) => {
        this.setState({
          errors: ['Connection failed.', error.response.statusText],
          btnLoading: false,
        });
      });
  }

  handleButtonClick() {
    const { attendee } = this.state;
    if (attendee) {
      this.handleLeaveEvent();
    } else {
      this.handleJoinEvent();
    }
  }

  render() {
    const { messages, errors, btnLoading, attendee, event } = this.state;
    const iconClockUrl = 'https://img.icons8.com/office/80/000000/clock.png';
    const iconLocationUrl = 'https://img.icons8.com/ultraviolet/80/000000/worldwide-location.png';
    const eventDateTime = `${event.date} - ${event.time.slice(11, 16)}`;
    const textButton = attendee ? 'Remove from your events' : 'Add to your events';
    return (
      <StyleRoot>
        <div className="container" style={animations.fadeInUp}>
          <ul className="text-success">
            {messages.map((msg) => <li key={uuidv4()}><small>{msg}</small></li>)}
          </ul>
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          <h3>{event.title}</h3>
          <div className="row">
            <div className="col-12 event-detail">
              <img src={iconClockUrl} alt="icon-clock" className="icon-clock" />
              <div className="event-info">
                <strong>Date and Time</strong>
                <span>
                  {eventDateTime}
                </span>
              </div>
            </div>
            <div className="col-12 event-detail">
              <img src={iconLocationUrl} alt="icon-location2" className="icon-location2" />
              <div className="event-info">
                <strong>Location</strong>
                <span>
                  {event.location}
                </span>
              </div>
            </div>
          </div>
          <Button disabled={btnLoading} onClick={!btnLoading ? this.handleButtonClick : null}>
            {btnLoading ? 'Loading…' : textButton}
          </Button>
          <div className="row">
            <div className="col-12 event-description">
              <strong>Description</strong>
              <p>{event.description}</p>
            </div>
          </div>
        </div>
      </StyleRoot>
    );
  }
}

EventForm.propTypes = {
  session: PropTypes.object.isRequired,
  arg: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const EventFormWrapper = connect(mapStateToProps, null)(EventForm);

export default EventFormWrapper;
