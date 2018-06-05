import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const headingClasses = [];

  if (props.center) {
    headingClasses.push('center');
  }

  return (
    <div className={`heading heading${props.headingLevel} ${headingClasses.join(' ')}`}>
      <h1 className={`heading${props.headingLevel}`}>{props.content}</h1>
    </div>
  );
};

Heading.propTypes = {
  headingLevel: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default Heading;
