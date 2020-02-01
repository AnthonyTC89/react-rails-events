import React from 'react';
import { Button } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import EventCard from '../components/EventCard';
import 'bootstrap/dist/css/bootstrap.css';

class DayEventContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    }
  }

  render() {
    const { dayEvents, index, joinEvents, filter,
        handleJoinEvent, handleLeaveEvent } = this.props;
    const events = dayEvents[1];
    return (
      <div key={uuidv4()} className="DayEventContainer">
        <h4>Day - {index + 1}</h4>
        {events.map((event) => {
          if (filter && !joinEvents.includes(event.id)) {
            return null;
          }
          return (
            <div  key={uuidv4()} className="row">
              <h6>{event.time.slice(11, 16)}</h6>
              <EventCard event={event} />
              {
                joinEvents.includes(event.id)
                  ? <Button variant="danger" onClick={() => handleLeaveEvent(event.id)}>-</Button>
                  : <Button variant="info" onClick={() => handleJoinEvent(event.id)}>+</Button>
              }
            </div>
          );
        })}
      </div>
    );
  }
}

export default DayEventContainer;