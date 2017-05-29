import React, { Component } from 'react';
import { Core } from './flexGrid';
import { Header } from './Bootstrap';
import './style.css';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
  }

  render() {
    return (
      <Core>
        <Header style={{ marginBottom: '8vh' }} fontSize='4em'>Where to code?</Header>
        <SearchBar
          width='40vw'
          height='40px'
          placeholder="Please insert your city or country"
          updateState={this.updateInputValue.bind(this)}
          state={this.state.inputValue}
        />
      </Core>
    );
  }

  updateInputValue(value) {
    this.setState({ inputValue: value });
  }
}

export default App;
