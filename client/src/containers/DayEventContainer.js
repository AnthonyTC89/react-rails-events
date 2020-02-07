import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';
import EventCard from '../components/EventCard';
import ConvertTime from '../ConvertTime';
import 'bootstrap/dist/css/bootstrap.css';

const DayEventContainer = (props) => {
  const { dayEvents, index, joinEvents, filter,
    handleJoinEvent, handleLeaveEvent } = props;
  const events = dayEvents[1];
  const subTitle = `Day - ${index + 1}`;
  return (
    <div key={uuidv4()} className="DayEventContainer">
      <h4>{subTitle}</h4>
      {events.map((event) => {
        if (filter && !joinEvents.includes(event.id)) {
          return null;
        }
        return (
          <div key={uuidv4()} className="row">
            <h6>{ConvertTime(event.time)}</h6>
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
};

DayEventContainer.propTypes = {
  dayEvents: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  joinEvents: PropTypes.array.isRequired,
  filter: PropTypes.bool.isRequired,
  handleJoinEvent: PropTypes.func.isRequired,
  handleLeaveEvent: PropTypes.func.isRequired,
};

export default DayEventContainer;
