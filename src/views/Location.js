import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { googleApiKey } from 'config';

import { GoogleMap } from 'components';

class View extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      map: null
    };
  }

  render() {
    return (
      <GoogleMap
        ApiKey={googleApiKey}
        address={document.title}
        state={this.state}
        updateState={this.setState.bind(this)}
      />
    );
  }
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('map')[0]);
}
