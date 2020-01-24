/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

class EventUpdateForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.arg.id,
      title: props.arg.title,
      description: props.arg.description,
      date: props.arg.date,
      time: props.arg.time.slice(11, 16),
      location: props.arg.location,
      user_id: props.session.user.user_id,
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

  handleSubmit(e) {
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

    axios.put(`api/v1/events/${id}`, { event }, { withCredentials: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log('api errors: ', error);
      });
  }

  render() {
    const { title, description, date, time, location, errors } = this.state;
    console.log(time);
    return (
      <form onSubmit={this.handleSubmit} className="form">
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
        <button type="submit">Update</button>
        <div className="form-group">
          {/* <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> */}
          <span>{errors}</span>
        </div>
      </form>
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

// const mapDispatchToProps = (dispatch) => ({

// });

const EventUpdateWrapper = connect(mapStateToProps, null)(EventUpdateForm);

export default EventUpdateWrapper;
