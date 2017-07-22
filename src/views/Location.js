import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { googleApiKey } from 'config';

import { GoogleMap } from 'components';

class View extends Component {
  render() {
    return (
      <GoogleMap ApiKey={googleApiKey} address={document.title} />
    );
  }
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('map')[0]);
}
