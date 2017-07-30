import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { GoogleMap } from 'components';
import { googleApiKey } from 'config';
import { greenMarker } from 'data.json';
import { MapStyle, CustomFeatures, MaxWidth, mb1 } from 'style/LocationStyle';
import { RowStyle, ColumnStyle } from 'style/Main';

class View extends Component {
  state = {
    map: null,
    newMarker: null,
    addingMarker: false,
    markers: null
  };

  render() {
    return (
      <div className="columns" style={{ height: '100%' }}>
        <div className="column">
          <GoogleMap
            ApiKey={googleApiKey}
            address={document.title}
            state={this.state}
            setState={this.setState.bind(this)}
            style={MapStyle}
            CustomFeatures={CustomFeatures}
          />

          <button style={{ ...MaxWidth, marginTop: '1rem' }}
           onClick={this.mapModeClickHandler.bind(this)}
           className="button" ref='mapMode'>
            Add Spot
          </button>
        </div>

        <div ref='placeList' className="column">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Spots</th>
                <th>Schedule</th>
                <th>Wifi</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div ref='placeForm' style={{ display: 'none' }} className="column">
          <h3 className="is-size-4" style={mb1}>New Spot</h3>

          <div style={mb1}>
            <label className='label'>Name</label>

            <input className="input" ref='NameInput' />
          </div>

          <div style={mb1}>
            <label className='label'>Schedule</label>

            <div className='columns'>
              <div className='column'>
                <div className="field has-addons">
                  <div className="control">
                    <p className="button">Opening</p>
                  </div>

                  <div className="control select">
                    <select ref='openingHour'>
                      { generateHours() }
                    </select>
                  </div>
                </div>
              </div>

              <div className='column'>
                <div className="field has-addons">
                  <div className="control">
                    <p className="button">Closing</p>
                  </div>

                  <div className="control select">
                    <select ref='closingHour'>
                      { generateHours() }
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={mb1}>
            <div className='columns'>
              <div className='column'>
                <label className='checkbox'>
                  Wifi available
                  <input ref='wifiAvailable' style={{ marginLeft: '0.5rem' }} type="checkbox" />
                </label>
              </div>

              <div className='column' style={{ display: 'block' }}>

              </div>
            </div>

          </div>

          <button
            onClick={this.submitClickHandler.bind(this)}
            className="button"
            style={MaxWidth}>
            Submit
          </button>
        </div>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.addingMarker != prevState.addingMarker) {
      this.updateButtons();
    }

    if (this.state.markers == null) {
      this.fetchMarkers();
    } else if (this.state.markers.length != 0) {
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

  mapModeClickHandler() {
    this.setState({ addingMarker: !this.state.addingMarker });
    this.updateButtons();
  }

  submitClickHandler() {
    var NameInput = this.refs.NameInput;
    var openingHour = this.refs.openingHour;
    var closingHour = this.refs.closingHour;
    var wifiAvailable = this.refs.wifiAvailable;

    if (NameInput.value != '') {
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

                console.log({
                  country: country,
                  city: city,
                  lat: location.lat().toString(),
                  lng: location.lng().toString(),
                  name: NameInput.value,
                  opening: openingHour.value,
                  closing: closingHour.value,
                  wifi: wifiAvailable.checked
                });

                axios.post('/marker', {
                  country: country,
                  city: city,
                  lat: location.lat().toString(),
                  lng: location.lng().toString(),
                  name: NameInput.value,
                  opening: openingHour.value,
                  closing: closingHour.value,
                  wifi: wifiAvailable.value
                }).then((res) => {
                  this.state.newMarker.setMap(null);
                  this.setState({ addingMarker: false, newMarker: null, markers: null });
                });
              }
            });
          }
        });
      } else {
        alert('No marker placed');
        return;
      }
    } else {
      alert('Please fill the new spot form');
      return;
    }
  }

  updateButtons() {
    var mainButton = this.refs.mapMode;
    var placeForm = this.refs.placeForm;
    var placeList = this.refs.placeList;

    if (!this.state.addingMarker) {
      mainButton.textContent = 'Add Spot';
      placeForm.style.display = 'none';
      placeList.style.display = 'block';
    } else {
      mainButton.textContent = 'Show Spots';
      placeForm.style.display = 'block';
      placeList.style.display = 'none';
    }
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
        var tbody = this.refs.placeList.childNodes[0].childNodes[1];

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }

        for (var m of res.data.markers) {
          m = JSON.parse(m);
          m = { ...m, lat: parseFloat(m.lat), lng: parseFloat(m.lng) }
          markers.push(m);

          var tr = document.createElement('tr');

          var name = document.createElement('td');
          name.innerHTML = m.name;
          tr.appendChild(name);

          var schedule = document.createElement('td');
          schedule.innerHTML = m.opening.toString() + ' - ' + m.closing.toString();
          tr.appendChild(schedule);

          var img = document.createElement('img');
          img.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/6156-200.png";
          img.style.height = '30px';

          var wifi = document.createElement('td');
          if (m.wifi) {
            wifi.appendChild(img);
          }
          tr.appendChild(wifi);

          var rating = document.createElement('td');
          if (m.rating == 0) {
            rating.innerHTML = 'No rating';
          } else {
            rating.innerHTML = m.rating.toFixed(1).toString() + ' / 5.0'
          }
          tr.appendChild(rating);

          tbody.appendChild(tr);
        }

        this.setState({ markers: markers });
      });
  }
}

function generateHours() {
  var numbers = [];

  for (var i = 1; i <= 24; ++i) numbers.push(i);

  var out = numbers.map((item) => {
    return (<option key={item}>{item}</option>);
  });

  return out;
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('mount')[0]);
}
