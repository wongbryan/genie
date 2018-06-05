import React from 'react';
import hip from '../../assets/images/hip.png';


const Image = props => (
  <div className="img-container">
    {props.image &&
      <img src={props.image} alt="custom" />
    }
    {!props.image &&
      <img src={hip} alt="hip" />
    }
  </div>
);

export default Image;
