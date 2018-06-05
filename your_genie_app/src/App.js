import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/index.css'

import Card from './components/Card';
import Button from './components/Button';
import ButtonBar from './components/ButtonBar';
import Heading from './components/Heading';
import Image from './components/Image';
import InlineStepper from './components/InlineStepper';
import SearchBar from './components/SearchBar';
import Paragraph from './components/Paragraph';

import { getElement } from './config/config';
import Components from './config/components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: Components,
    };
  }

  render() {
    return (
      <div className="App">
        <Card size="large" >
          {this.state.components.map((component, index) => (
            getElement(component, index)
          ))}
        </Card>
        <Card size="medium" >
          {this.state.components.map((component, index) => (
            getElement(component, index)
          ))}
        </Card>
        <Card size="small" >
          {this.state.components.map((component, index) => (
            getElement(component, index)
          ))}
        </Card>
      </div>
    );
  }
}

export default App;
