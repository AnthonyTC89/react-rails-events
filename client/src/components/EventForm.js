/* eslint-disable object-curly-newline */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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

  handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line camelcase
    const { title, description, date, time, location, user_id } = this.state;
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

    axios.post('api/v1/events', data)
      .then((response) => {
        console.log(response);
        this.setDefaultState();
      })
      .catch((error) => {
        console.log('api errors: ', error);
        this.setState({
          errors: error,
        });
      });
  }

  render() {
    const { title, description, date, time, location, errors } = this.state;
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
        <button type="submit">Create</button>
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
