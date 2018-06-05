import React from 'react';

import Button from '../components/Button';
import Heading from '../components/Heading';
import Image from '../components/Image';
import InlineStepper from '../components/InlineStepper';
import Paragraph from '../components/Paragraph';
import SearchBar from '../components/SearchBar';
import ButtonBar from '../components/ButtonBar';

const onClickNull = () => {};

const pgText = 'Lorem ipsum dolor sit amet, vis populo laoreet indoctum ne, per ad minim feugiat omittam, quas habeo numquam ad eam.';

export const getElement = (s, i) => {
  let result;
  switch (s) {
    case 'Button':
      result = <Button key={i} rounded label="button" color="primary" onClick={onClickNull} />;
      break;
    case 'ButtonBar':
      result = <ButtonBar key={i} label="button" buttonLabel="click" buttonColor="primary" onClick={onClickNull} />;
      break;
    case 'InlineStepper':
      result = <InlineStepper key={i} label="inline stepper" />;
      break;
    case 'Image':
      result = <Image key={i} />;
      break;
    case 'Paragraph':
      result = <Paragraph key={i} text={pgText} />;
      break;
    case 'h1':
      result = <Heading key={i} headingLevel={1} content="Heading 1" label="header" color="primary" onClick={onClickNull} />;
      break;
    case 'h2':
      result = <Heading key={i} headingLevel={2} content="Heading 2" label="header" color="primary" onClick={onClickNull} />;
      break;
    case 'h3':
      result = <Heading key={i} headingLevel={3} content="Heading 3" label="header" color="primary" onClick={onClickNull} />;
      break;
    case 'SearchBar':
      result = <SearchBar key={i} />;
      break;
    default:
      result = <Button key={i} label="default" color="primary" onClick={onClickNull} />;
      break;
  }

  return result;
};
