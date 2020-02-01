import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import iconLocation from '../images/iconLocation.png';
import './Card.css';

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { isClicked } = this.state;
    this.setState({
      isClicked: !isClicked,
    });
  }

  render() {
    const { event } = this.props;
    const { isClicked } = this.state;
    console.log(isClicked);
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
};

export default EventCard;
