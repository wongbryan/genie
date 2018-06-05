import React from 'react';
import add from '../../assets/images/add.png';
import sub from '../../assets/images/sub.png';


const InlineStepper = props => (
  <div className="stepper">
    <h1>{props.label}</h1>
    <div className="step-container">
      <div className="button-container">
        <img src={add} alt="add" />
      </div>
      <div className="button-container">
        <img src={sub} alt="sub" />
      </div>
    </div>
  </div>
);

export default InlineStepper;
