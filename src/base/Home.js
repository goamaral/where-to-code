import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { SearchBar, Dropdown } from 'components';
import { googleApiKey } from 'config';
import { reactNodeToNativeNode } from 'helpers';

class countriesSearchBar extends Component {
  // Lifecycle methods
  componentDidMount() {
    this.fetchCountries();
  }

  // State updaters
  updateInputState(type, payload) {
    this.setState((prevState, props) => {
      switch (type) {
        case 'country':
          return { input: { ...prevState.input, country: payload } };
        case 'city':
          return { input: { ...prevState.input, city: payload } };
      }
    });
  }

  // Render
  render() {
    return (
      <div className="columns">
        <div className='column'>
          <SearchBar
            placeholder="Country"
            className='mb1'
            suggestions={this.state.suggestions.country}
            state={this.state.input.country}
            updateState={value => { this.updateInputState('country', value) }}
            store={this.store.country}
            updateStore={payload => { this.updateStore('country', payload) }}
          />

          <SearchBar
            placeholder="City"
            className='mb1'
            suggestions={this.state.suggestions.city}
            state={this.state.input.city}
            updateState={value => { this.updateInputState('city', value) }}
            store={this.store.city}
            updateStore={payload => { this.updateStore('city', payload) }}
          />

          <a onClick={this.onClickSubmitButton.bind(this)}
           className="button is-warning full-width">
            Lets go
          </a>
        </div>
      </div>
    );
  }

  // Event handlers
  onClickSubmitButton() {
    window.location.pathname = '/location/' + this.store.city.value + ', '
      + this.store.country.value;
  }

  // Helpers
  updateStore(type, payload) {
    switch (type) {
      case 'country':
        this.store.country = payload;
        this.updateStore('city', '');
        this.updateInputState('city', '');
        this.fetchCities(payload.value);
        return;
      case 'city':
        this.store.city = payload;
        return;
    }
  }

  // Data fetching
  fetchCountries() {
    axios.post('/json/countries')
      .then((res) => {
        this.setState(function(prevState, props) {
          return {
            suggestions: { ...prevState.suggestions, country: res.data }
          }
        });
      });
  }

  fetchCities(country) {
    axios.post('/json/cities', { country })
      .then((res) => {
        this.setState(function(prevState, props) {
          return {
            suggestions: { ...prevState.suggestions, city: res.data }
          }
        });
      });
  }

  // Constructor
  constructor() {
    super();
    this.state = {
      suggestions: {
        country: [],
        city: []
      },
      input: {
        country: '',
        city: ''
      }
    }

    this.store = {
      country: {
        filled: false,
        value: ''
      },
      city: {
        filled: false,
        value: ''
      }
    }
  }
}
window.onload = () => {
  ReactDOM.render(React.createElement(countriesSearchBar), document.getElementById('searchBars'));
}
