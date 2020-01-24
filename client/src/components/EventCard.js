import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const EventCard = (props) => {
  const { event } = props;
  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src="https://picsum.photos/seed/picsum/50" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        {/* <Button variant="primary">More Info</Button> */}
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
