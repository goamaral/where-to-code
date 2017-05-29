import React, { Component } from 'react';
import { Core } from './flexGrid';
import { SearchInput, H1 } from './Bootstrap';
import './style.css';

class App extends Component {
  render() {
    return (
      <Core>
        <H1 fontSize='60px'>Where to code?</H1>
        <SearchInput width='500px' height='40px' placeholder="Please type your city or country" />
      </Core>
    );
  }
}

export default App;
