import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';
import updateDashboard from '../redux/actions/updateDashboard';
import iconEdit from '../images/iconEdit.png';
import './EventContainer.css';

class MyEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getMyEvents();
  }

  setStateDeafult() {
    this.setState({
      events: [],
    });
  }

  getUpcomingEvents() {
    const params = { date: new Date() };
    console.log(params);
    axios.get('/api/v1/events', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  getMyEvents() {
    const { session } = this.props;
    const params = { user_id: session.user.id };
    axios.get('/api/v1/events', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
        });
      })
      .catch((error) => console.log('api errors:', error));
  }

  handleEdit(event) {
    const { changeDashboardTo } = this.props;
    changeDashboardTo({ name: 'EventUpdateForm', arg: event });
  }

  render() {
    const { events } = this.state;
    return (
      <div className="container">
        <h3>MY EVENTS</h3>
        {events.map((event) => (
          <div key={event.id} className="row">
            <EventCard event={event} />
            <Button variant="info" onClick={() => this.handleEdit(event)}>
              <img className="icon" src={iconEdit} alt="icon-edit" />
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

MyEventsContainer.propTypes = {
  checkLoginStatus: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  changeDashboardTo: PropTypes.func.isRequired,
};

MyEventsContainer.defaultProps = {

};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  checkLoginStatus: () => dispatch(loginStatus()),
  changeDashboardTo: (Component) => dispatch(updateDashboard(Component)),
});

const MyEventsWrapper = connect(mapStateToProps, mapDispatchToProps)(MyEventsContainer);

export default MyEventsWrapper;
