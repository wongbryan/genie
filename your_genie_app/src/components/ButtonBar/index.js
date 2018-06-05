import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';

const ButtonBar = (props) => {
  const buttonClasses = [];

  if (props.rounded) {
    buttonClasses.push('rounded');
  }
  if (props.ghost) {
    buttonClasses.push('ghost');
  }
  if (props.large) {
    buttonClasses.push('large');
  }

  return (
    <div className="buttonBar">
      {props.label && <h3>{props.label}</h3>}
      <div className="button-container">
        <Button label={props.buttonLabel} color={props.buttonColor} onClick={props.onClick} />
      </div>
    </div>
  );
};

ButtonBar.propTypes = {
  label: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  ghost: PropTypes.bool,
  large: PropTypes.bool,
  buttonLabel: PropTypes.string.isRequired,
  buttonColor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonBar;
