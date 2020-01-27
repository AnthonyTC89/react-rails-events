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
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      user_id: props.session.user.id,
      messages: [],
      errors: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setDefaultState = this.setDefaultState.bind(this);
  }

  setDefaultState() {
    this.setState({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      errors: [],
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line camelcase
    const { title, description, date, time, location, user_id } = this.state;
    const eventDate = new Date(date);
    const today = new Date();
    if (eventDate.getTime() < today.getTime()) {
      this.setState({
        errors: ['Set a valid date.'],
      });
      return;
    }
    const data = {
      event: {
        title,
        description,
        date,
        time,
        location,
        status: 1,
        user_id,
      },
    };

    this.setState({
      btnLoading: true,
    });

    await axios.post('api/v1/events', data)
      .then((response) => {
        this.setState({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          btnLoading: false,
          messages: [response.statusText],
          errors: [],
        });
      })
      .catch((error) => {
        this.setState({
          btnLoading: false,
          messages: [],
          errors: [error.response.statusText],
        });
      });
  }

  render() {
    const { title, description, date, time, location,
      btnLoading, messages, errors } = this.state;
    return (
      <StyleRoot>
        <form
          onSubmit={!btnLoading ? this.handleSubmit : null}
          style={animations.fadeInLeft}
        >
          <h3>Create your event</h3>
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            placeholder="title"
            value={title}
            name="title"
            minLength="4"
            required
          />
          <input
            className="form-control"
            onChange={this.handleChange}
            type="text"
            placeholder="description"
            value={description}
            name="description"
            minLength="4"
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
            {btnLoading ? 'Loading…' : 'Create'}
          </Button>
        </form>
      </StyleRoot>
    );
  }
}

EventForm.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

// const mapDispatchToProps = (dispatch) => ({

// });

const EventFormWrapper = connect(mapStateToProps, null)(EventForm);

export default EventFormWrapper;
