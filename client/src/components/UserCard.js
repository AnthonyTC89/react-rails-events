import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import './UserCard.css';

const getStatusName = (status) => {
  switch (status) {
    case 0:
      return 'Disabled';
    case 1:
      return 'Admin';
    case 2:
      return 'Super User';
    case 3:
      return 'User';
    case 4:
      return 'User';
    default:
      return 'undefined';
  }
};

const UserCard = (props) => {
  const { user } = props;
  return (
    <Card className="user-card">
      <Card.Body>
        <Card.Title>{user.username}</Card.Title>
        <Card.Subtitle>
          <Card.Text>{user.email}</Card.Text>
        </Card.Subtitle>
        <Card.Text>
          <small>
            {getStatusName(user.status)}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
