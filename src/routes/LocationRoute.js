import React, { Component } from 'react';

import { googleApiKey } from 'config';
import { MapStyle, DivStyle, HeaderStyle } from 'style/LocationStyle';
import { Row } from 'components/flexGrid';

export default class LocationRoute extends Component {
  render() {
    var location = document.title //Page title
      .split(' ').join('+'); //Replace spaces
    var iframeSrc= "https://www.google.com/maps/embed/v1/search?key=" + googleApiKey + "&q=" + location;
    return (
      <div style={DivStyle}>
        <h1 style={HeaderStyle}>{document.title}</h1>
        <iframe
          style={MapStyle}
          src={iframeSrc}
          allowFullScreen='true'>
        </iframe>
      </div>
    );
  }
}
