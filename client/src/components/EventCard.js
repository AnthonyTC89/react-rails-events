import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { StyleRoot } from 'radium';
import './EventCard.css';
import animations from '../animations';

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
    const cardBody = (
      <StyleRoot>
        <div style={animations.fadeInDown}>
          <Card.Body>
            <Card.Subtitle>
              <Card.Text>{event.location}</Card.Text>
            </Card.Subtitle>
            <Card.Text>
              {event.description}
            </Card.Text>
          </Card.Body>
        </div>
      </StyleRoot>
    );
    return (
      <Card className="event-card" onClick={this.handleClick}>
        <Card.Header>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle>
            <Card.Text>{event.date}</Card.Text>
            <Card.Text>{event.time.slice(11, 16)}</Card.Text>
          </Card.Subtitle>
        </Card.Header>
        {isClicked ? cardBody : null}
      </Card>
    );
  }
}

EventCard.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventCard;
