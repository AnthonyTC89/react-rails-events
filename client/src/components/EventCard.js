import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './EventCard.css';

const EventCard = (props) => {
  const { event } = props;
  const handleClick = (Component) => {
    console.log(Component);
  };

  return (
    <Card className="event-card">
      <Card.Body
        onClick={() => handleClick({ Component: 'EventInfo', arg: event })}
      >
        <Card.Title>{event.title}</Card.Title>
        <Card.Subtitle>
          <Card.Text>Speaker </Card.Text>
          <Card.Text>{event.location}</Card.Text>
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

// const mapStateToProps = (state) => ({
//   session: state.session,
// });

// const mapDispatchToProps = (dispatch) => ({
//   checkLoginStatus: () => dispatch(loginStatus()),
// });

// const EventInfoWrapper = connect(mapStateToProps, mapDispatchToProps)(EventInfo);

export default EventCard;
