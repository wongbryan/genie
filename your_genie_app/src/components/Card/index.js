import React from 'react';

const Card = props => (
  <div className={`card card-${props.size}`}>
    {props.children}
  </div>
);

export default Card;
