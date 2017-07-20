import React, { Component } from 'react';

import { googleApiKey } from 'config';
import { DivStyle, HeaderStyle } from 'style/LocationStyle';
import GoogleMap from 'components/GoogleMap';

export default class LocationRoute extends Component {
  render() {
    var location = document.title //Page title
      .split(' ').join('+'); //Replace spaces
    return (
      <div style={DivStyle}>
        <h1 style={HeaderStyle}>{document.title}</h1>
        <GoogleMap ApiKey={googleApiKey} address={document.title} />
      </div>
    );
  }
}
