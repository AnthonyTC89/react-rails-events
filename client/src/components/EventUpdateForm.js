import React from 'react';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class EventUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.arg.id,
      title: props.arg.title,
      description: props.arg.description,
      date: props.arg.date,
      time: props.arg.time.slice(11, 16),
      location: props.arg.location,
      user_id: props.session.user.user_id,
      btnLoading: false,
      messages: [],
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line camelcase
    const { id, title, description, date, time, location, user_id } = this.state;
    const event = {
      id,
      title,
      description,
      date,
      time,
      location,
      status: 1,
      user_id,
    };
    this.setState({
      btnLoading: true,
    });
    await axios.put(`api/v1/events/${id}`, { event }, { withCredentials: true })
      .then((response) => {
        this.setState({
          btnLoading: false,
          errors: [],
          messages: [response.statusText, 'Event updated.'],
        });
      })
      .catch((error) => {
        this.setState({
          btnLoading: false,
          errors: ['Connection failed.', error.response.statusText],
          messages: [],
        });
      });
  }

  render() {
    const { title, description, date, time, location,
      messages, errors, btnLoading } = this.state;
    return (
      <StyleRoot>
        <form
          onSubmit={!btnLoading ? this.handleSubmit : null}
          style={animations.fadeInLeft}
        >
          <h3>Edit your Event</h3>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            placeholder="title"
            value={title}
            name="title"
            required
          />
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            placeholder="description"
            value={description}
            name="description"
            required
          />
          <input
            className="form-control"
            onChange={this.handleChange}
            type="date"
            placeholder="date"
            value={date}
            name="date"
            required
          />
          <input
            className="form-control"
            onChange={this.handleChange}
            type="time"
            placeholder="time"
            value={time}
            name="time"
          />
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            placeholder="location"
            value={location}
            name="location"
          />
          <ul className="text-success">
            {messages.map((msg) => <li key={uuidv4()}><small>{msg}</small></li>)}
          </ul>
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          <Button type="submit" variant="primary" disabled={btnLoading}>
            {btnLoading ? 'Loading…' : 'Update'}
          </Button>
        </form>
      </StyleRoot>
    );
  }
}

EventUpdateForm.propTypes = {
  session: PropTypes.object.isRequired,
  arg: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const EventUpdateWrapper = connect(mapStateToProps, null)(EventUpdateForm);

export default EventUpdateWrapper;
