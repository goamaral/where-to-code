import React, { Component } from 'react';
import { Core } from './flexGrid';
import { Header } from './Bootstrap';
import './style.css';
import SearchBar from './SearchBar';
import { ListItem } from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      originalData: ['Viseu', 'Portugal', 'Porto', 'Espanha', 'Lisboa', 'Coimbra', 'Madrid', 'Vila Real', 'Braga', 'Braganca']
    };
    this.listMore = false;
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
          data={this.filterData()}
          extraChildren={this.generateExtraChildren()}
        />
      </Core>
    );
  }

  generateExtraChildren() {
    let out = [<ListItem key='extraChild' style={{ borderRadius: '0 0 4px 4px' }}  data="Can't find it? Please add it :)" />];
    if (this.listMore) {
      out.unshift(<ListItem key='extraChild2' data="..." />)
    }

    return out;
  }

  filterData() {
    let out = this.state.originalData.filter((item) => {
      return item.toLowerCase().includes(this.state.inputValue.toLowerCase());
    });

    this.listMore = out.length > 5;

    out = out.splice(0,5);

    console.log(out);

    return out;
  }

  updateInputValue(value) {
    this.setState({ inputValue: value });
  }
}

export default App;
