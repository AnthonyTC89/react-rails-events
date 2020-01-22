import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Image, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

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

// function simulateNetworkRequest() {
//   return new Promise((resolve) => setTimeout(resolve, 2000));
// }
async function upgradeStatus(user) {
  // eslint-disable-next-line no-param-reassign
  user.status = 2;
  return axios.put(`api/v1/users/${user.id}`, { user }, { withCredentials: true })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.log('api errors: ', error));
}

const UserInfo = (props) => {
  const [isLoading, setLoading] = useState(false);
  const handleClick = () => setLoading(true);
  const { user } = props;
  const hash = CryptoJS.MD5(user.email);
  const url = `http://www.gravatar.com/avatar/${hash}`;
  const statusName = getStatusName(user.status);
  const btnUpgrade = user.status === 4 ? (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}
    >
      {isLoading ? 'Loading…' : 'Upgrade'}
    </Button>
  ) : null;

  useEffect(() => {
    if (isLoading) {
      upgradeStatus(user).then(() => {
        setLoading(false);
      });
    }
  }, [isLoading, user]);

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
        {statusName}
      </div>
      <div className="col-2">
        {btnUpgrade}
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
