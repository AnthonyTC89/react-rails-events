import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';

class AllEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getAllEvents();
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

  handleDelete(id) {
    axios.delete(`api/v1/events/${id}`, { withCredentials: true })
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
        {events.map((event) => (
          <div key={event.id}>
            <EventCard event={event} />
            <Button onClick={() => this.handleDelete(event.id)}>Delete</Button>
          </div>
        ))}
      </div>
    );
  }
}

AllEventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  // session: PropTypes.object.isRequired,
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
