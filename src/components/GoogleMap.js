import React, { Component } from 'react';

export default class GoogleMap extends Component {
  render() {
    return (
      <div className={this.props.className} ref='googleMap' style={this.props.style}></div>
    );
  }

  componentDidMount() {
    var address = this.props.address;
    var div = this.refs.googleMap;

    var script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.props.ApiKey;
    document.head.appendChild(script);

    script.onload = () => {
      new google.maps.Geocoder().geocode( { 'address': address}, (res, sts) => {
        if (sts == google.maps.GeocoderStatus.OK) {
          var zoom = this.calculateZoom(res[0].types);

          var coord = {
            lat: res[0].geometry.location.lat(),
            lng: res[0].geometry.location.lng()
          };

          var map = new google.maps.Map(div, {
            zoom: zoom,
            center: coord,
            styles: this.props.CustomFeatures
          });

          this.props.setState({ map: map });
        }
      });
    }
  }

  calculateZoom(types) {
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
  }
}
