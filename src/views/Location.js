import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { GoogleMap } from 'components';
import { googleApiKey } from 'config';
import { greenMarker } from 'data.json';
import { MapStyle, CustomFeatures } from 'style/LocationStyle';
import { RowStyle } from 'style/Main';

class View extends Component {
  constructor() {
    super();
    this.state = {
      map: null,
      newMarker: null,
      addingMarker: false,
      markers: null
    };
  }

  render() {
    return (
      <div>
        <GoogleMap
          ApiKey={googleApiKey}
          address={document.title}
          state={this.state}
          setState={this.setState.bind(this)}
          style={MapStyle}
          CustomFeatures={CustomFeatures}
        />
        <div style={RowStyle}>
          <button ref='mapMode'></button>
          <button ref='newSpot'>Send new spot</button>
        </div>
      </div>
    );
  }

  fetchMarkers() {
    var location = document.title.replace(' ','').split(',');

    if (location.length == 1) {
      var params = {
        city: null,
        country: location[0]
      }
    } else {
      var params = {
        city: location[0],
        country: location[1]
      }
    }

    axios.post('/markers', params)
      .then((res) => {
        var markers = [];

        console.log('post request');
        for (var m of res.data.markers) {
          markers.push(JSON.parse(m));
        }

        this.setState({ markers: markers });
      });
  }

  updateButtons() {
    var mainButton = this.refs.mapMode;
    var newButton = this.refs.newSpot;

    if (!this.state.addingMarker) {
      newButton.style.display = 'none';
      mainButton.textContent = 'Add Spot';
    } else {
      newButton.style.display = 'block';
      mainButton.textContent = 'Show Spots Info';
    }
  }

  componentDidMount() {
    var mainButton = this.refs.mapMode;
    var newButton = this.refs.newSpot;

    this.updateButtons();

    mainButton.onclick = () => {
      this.setState({ addingMarker: !this.state.addingMarker });
      this.updateButtons();
    }

    newButton.onclick = () => {
      if (this.state.newMarker != null) {
        var location = this.state.newMarker.internalPosition;

        new google.maps.Geocoder().geocode({'latLng': location}, (res, sts) => {
          if(sts == google.maps.GeocoderStatus.OK) {
            new google.maps.Geocoder().geocode({'placeId': res[0].place_id}, (res, sts) => {
              if(sts == google.maps.GeocoderStatus.OK) {
                var count = res[0].address_components.length - 1;

                while (true) {
                  var country = res[0].address_components[count].long_name;
                  if (!isNaN(parseInt(country))) {
                    count -= 1;
                  } else break;
                }

                var city = res[0].address_components[count-1].long_name;

                axios.post('/marker', {
                  country: country,
                  city: city,
                  lat: location.lat().toPrecision(6),
                  lng: location.lng().toPrecision(6)
                }).then((res) => {
                  this.state.newMarker.setMap(null);
                  this.setState({ addingMarker: false, newMarker: null, markers: null });
                });
              }
            });
          }
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.addingMarker != prevState.addingMarker) {
      this.updateButtons();
    }

    if (this.state.markers == null) {
      this.fetchMarkers();
    } else if (this.state.markers.length != 0) {
      console.log('markers');
      for (var m of this.state.markers) {
        var coor = {
          lat: m.lat,
          lng: m.lng
        }

        new google.maps.Marker({
            position: coor,
            map: this.state.map
          });
      }
    }

    if (this.state.map != null) {
      this.state.map.addListener('click', ev => {
        if (this.state.addingMarker) {
          if (this.state.map.getZoom() >= 17) {
            var coor = {
              lat: ev.latLng.lat(),
              lng: ev.latLng.lng()
            };

            var marker = new google.maps.Marker({
                icon: greenMarker,
                position: coor,
                map: this.state.map
            });

            if (this.state.newMarker != null) {
              this.state.newMarker.setMap(null);
            }

            this.setState({ newMarker: marker });
          } else {
            alert('Please zoom for more acurate marking');
          }
        }
      });
    }
  }
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('map')[0]);
}
