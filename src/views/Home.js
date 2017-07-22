import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import { SearchBar } from 'components';
import { SearchBarStyle } from 'style/HomeStyle';
import { googleApiKey } from 'config.json';
import axios from 'axios';

class View extends Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      location: ''
    };
  }

  render() {
    return (
      <SearchBar
        style={SearchBarStyle}
        placeholder="Please insert your city or country"
        updateState={this.updateInputValue.bind(this)}
        state={this.state.location}
        data={this.processData()}
      />
    );
  }

  processData() {
    return this.state.locations.map((item) => {
      return (<a style={{ textDecoration: 'none' }} href={'/location/' + item.description}>{item.description}</a>);
    });
  }

  updateInputValue(value) {
    this.setState({ location: value });
    this.fetchLocations(value);
  }

  fetchLocations(location) {
  	axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
  		params: {
  			key: googleApiKey,
  			input: location
  		}
  	})
  	.then(result => { this.setState({ locations: result.data.predictions }) })
  	.catch((error) => {
  		alert(error);
  	});
  };
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('searchbar')[0]);
}
