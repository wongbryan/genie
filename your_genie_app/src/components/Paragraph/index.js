import React from 'react';

const Paragraph = props => (
  <div className="pg-container">
    <p className="pg">{props.text || 'Lorem ipsum dolor sit amet, vis populo laoreet indoctum ne, per ad minim feugiat omittam, quas habeo numquam ad eam.'}</p>
  </div>
);

export default Paragraph;
