/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

const ToogleSwitch = ({ textLeft, textRight, onChange, onSwitch }) => (
  <>
    <div className="custom-control custom-switch">
      <label className="custom-control-label" htmlFor="customSwitches">
        {textLeft}
      </label>
      <input
        type="checkbox"
        className="custom-control-input"
        id="customSwitches"
        readOnly
        checked={onSwitch}
        onChange={onChange}
      />
      <label className="custom-control-label" htmlFor="customSwitches">
        {textRight}
      </label>
    </div>
  </>
);

ToogleSwitch.propTypes = {
  textLeft: PropTypes.string,
  textRight: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSwitch: PropTypes.bool.isRequired,
};

ToogleSwitch.defaultProps = {
  textLeft: '',
  textRight: '',
};

export default ToogleSwitch;
