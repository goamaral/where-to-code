import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { SearchBar, Dropdown } from 'components';
import { SearchBarStyle } from 'style/HomeStyle';
import { googleApiKey } from 'config';
import { reactNodeToNativeNode } from 'helpers';

class countriesSearchBar extends Component {
  state = {
    suggestions: []
  }

  componentDidMount() {
    axios.post('/json/countries')
      .then((res) => {
        this.setState({ suggestions: res.data });
      });
  }

  render() {
    return (
      <SearchBar
        style={SearchBarStyle}
        placeholder="Please insert country"
        suggestions={this.state.suggestions}
      />
    );
  }
}

window.onload = () => {
  ReactDOM.render(React.createElement(countriesSearchBar), document.getElementById('root'));
}
