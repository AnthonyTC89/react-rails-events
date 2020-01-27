import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleRoot } from 'radium';
import { Button, Spinner } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';
import animations from '../animations';
import './EventContainer.css';
import 'bootstrap/dist/css/bootstrap.css';


class AllEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: false,
      messages: [],
      errors: [],
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getAllEvents();
  }

  async getAllEvents() {
    this.setState({
      isLoading: true,
      messages: [],
      errors: [],
    });
    await axios.get('/api/v1/events', { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          events: [],
          errors: ['Connection failed.', error.response.statusText],
          isLoading: false,
        });
      });
  }

  async handleDelete(id) {
    this.setState({
      isLoading: true,
      messages: [],
      errors: [],
    });
    await axios.delete(`api/v1/events/${id}`, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
          isLoading: false,
          messages: ['Event deleted.'],
        });
      })
      .catch((error) => {
        this.setState({
          events: [],
          isLoading: false,
          errors: ['Connection failed.', error.response.statusText],
        });
      });
  }

  render() {
    const { events, isLoading, messages, errors } = this.state;
    return (
      <StyleRoot>
        <div className="container" style={animations.fadeInLeft}>
          <h3>ALL EVENTS</h3>
          <ul className="text-success">
            {messages.map((msg) => <li key={uuidv4()}><small>{msg}</small></li>)}
          </ul>
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          {isLoading ? <Spinner animation="border" /> : null}
          {events.map((event) => (
            <div key={event.id} className="row">
              <EventCard event={event} />
              <Button variant="danger" onClick={() => this.handleDelete(event.id)}>x</Button>
            </div>
          ))}
        </div>
      </StyleRoot>
    );
  }
}

AllEventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
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
