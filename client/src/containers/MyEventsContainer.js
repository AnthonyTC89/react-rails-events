import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Spinner } from 'react-bootstrap';
import { StyleRoot } from 'radium';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import loginStatus from '../redux/actions/loginStatus';
import EventCard from '../components/EventCard';
import updateDashboard from '../redux/actions/updateDashboard';
import iconEdit from '../images/iconEdit.png';
import animations from '../animations';
import 'bootstrap/dist/css/bootstrap.css';

class MyEventsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      errors: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const { checkLoginStatus } = this.props;
    checkLoginStatus();
    this.getMyEvents();
  }

  async getMyEvents() {
    this.setState({
      isLoading: true,
    });
    const { session } = this.props;
    const params = { user_id: session.user.id };
    await axios.get('/api/v1/events', { params }, { withCredentials: true })
      .then((response) => {
        this.setState({
          events: response.data,
          errors: [],
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

  handleEdit(event) {
    const { changeDashboardTo } = this.props;
    changeDashboardTo({ name: 'EventUpdateForm', arg: event });
  }

  render() {
    const { events, errors, isLoading } = this.state;
    return (
      <StyleRoot>
        <div className="container" style={animations.fadeInRight}>
          <h3>My Events</h3>
          {isLoading ? <Spinner animation="border" /> : null}
          <ul className="text-danger">
            {errors.map((err) => <li key={uuidv4()}><small>{err}</small></li>)}
          </ul>
          {events.map((event) => (
            <div key={event.id} className="row">
              <EventCard event={event} />
              <Button variant="info" onClick={() => this.handleEdit(event)}>
                <img className="icon" src={iconEdit} alt="icon-edit" />
              </Button>
            </div>
          ))}
        </div>
      </StyleRoot>
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
