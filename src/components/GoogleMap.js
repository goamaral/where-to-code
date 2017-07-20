import React, { Component } from 'react';

import { MapStyle } from 'style/LocationStyle';

export default class GoogleMap extends Component {
  render() {
    return (
      <div ref='googleMap' style={MapStyle}></div>
    );
  }

  componentDidMount() {
    var location = document.title //Page title
      .split(' ').join('+'); //Replace spaces

    var div = this.refs.googleMap;

    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.ApiKey;
    document.head.appendChild(script);
    script.onload = function() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': location}, function(res, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var zoom = function() {
            var types = res[0].types;
            if (types.includes('route') || types.includes('street_number') || types.includes('street_address')) {
              return 16;
            } else if (types.includes('neighborhood')) {
              return 14;
            } else if (types.includes('sublocality') || types.includes('administrative_area_level_2')) {
              return 10;
            } else if (types.includes('administrative_area_level_1')) {
              return 6;
            } else if (types.includes('country')) {
              return 4;
            } else if (types.includes('postal_code') || types.includes('locality')) {
              return 13;
            }
            else alert('Invalid location');
          }();
          var coord = {
            lat: res[0].geometry.location.lat(),
            lng: res[0].geometry.location.lng()
          };
          this.map = new google.maps.Map(div, {
            zoom: zoom,
            center: coord
          });
        }
      });

    }
  }
}
