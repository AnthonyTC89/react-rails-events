import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import updateDashboard from '../redux/actions/updateDashboard';
import iconLocation from '../images/iconLocation.png';
import './Card.css';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { changeDashboardTo, event } = this.props;
    changeDashboardTo({ name: 'EventInfo', arg: event });
  }

  render() {
    const { event } = this.props;
    return (
      <Card className="event-card" onClick={this.handleClick}>
        <Card.Header>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle>
            <Card.Text>
              <img className="icon-location" src={iconLocation} alt="icon-location" />
              {event.location}
            </Card.Text>
          </Card.Subtitle>
        </Card.Header>
      </Card>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
  changeDashboardTo: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  changeDashboardTo: (Component) => dispatch(updateDashboard(Component)),
});

const EventCardWrapper = connect(null, mapDispatchToProps)(EventCard);

export default EventCardWrapper;
