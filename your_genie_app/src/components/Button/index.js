import React from 'react';

const Button = (props) => {
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
  if (props.textOnly) {
    buttonClasses.push('textOnly');
  }

  return (
    <div>
      <button className={`btn btn-${props.color} ${buttonClasses.join(' ')}`} onClick={props.onClick}>
        <span>{props.label}</span>
        {props.secondaryLabel && <span className="light">{props.secondaryLabel}</span>}
      </button>
    </div>
  );
};

export default Button;
