import React from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import { Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const User = (props) => {
  const { user } = props;
  const hash = CryptoJS.MD5(user.email);
  const url = `http://www.gravatar.com/avatar/${hash}`;

  return (
    <div className="row">
      <div className="col-2">
        <Image src={url} roundedCircle />
      </div>
      <div className="col-6">
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <div className="col-2">
        {user.status}
      </div>
      <div className="col-2">
        <button type="button">Button</button>
      </div>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired,
};

export default User;
