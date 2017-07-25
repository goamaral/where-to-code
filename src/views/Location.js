import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from 'axios';

import { GoogleMap } from 'components';
import { googleApiKey } from 'config';
import { greenMarker } from 'data.json';
import { MapStyle, CustomFeatures } from 'style/LocationStyle';
import { RowStyle, ColumnStyle } from 'style/Main';

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
      <div className="row">
        <div className="col-6 hero-body">
          <GoogleMap
            ApiKey={googleApiKey}
            address={document.title}
            state={this.state}
            setState={this.setState.bind(this)}
            style={MapStyle}
            CustomFeatures={CustomFeatures}
          />

          <button
            style={{width: '100%'}}
            onClick={this.mapModeClickHandler.bind(this)}
            className="btn btn-secondary mt-3"
            ref='mapMode'>
            Add Spot
          </button>
        </div>

        <div ref='placeList' className="col-6 pr-5 hero-body">
          <table className="table">
            <thead>
              <tr>
                <th>Spots</th>
                <th>Morning</th>
                <th>Afternoon</th>
                <th>Night</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>

        <div ref='placeForm' style={{ display: 'none' }} className="col-6 pr-5 hero-body">
          <h3 className="mb-3">New Spot</h3>

          <div className="mb-3">
            <h5>Name</h5>

            <input
              className="form-control"
              ref='NameInput'
            />
          </div>

          <div className="mb-3">
            <h5>Schedule</h5>

            <label className="form-check-label col-12">
              <input
                className="form-check-input mr-2"
                type="checkbox"
                ref='MorningCheckbox'
              />
              Morning
            </label>

            <label className="form-check-label col-12">
              <input
                className="form-check-input mr-2"
                type="checkbox"
                ref='AfternoonCheckbox'
              />
              Afternoon
            </label>

            <label className="form-check-label col-12">
              <input
                className="form-check-input mr-2"
                type="checkbox"
                ref='NightCheckbox'
              />
              Night
            </label>
          </div>

          <button
            onClick={this.submitClickHandler.bind(this)}
            className="btn btn-secondary"
            style={{width: '100%'}}>
            Submit
          </button>
        </div>
      </div>
    );
  }

  submitClickHandler() {
    var MorningCheckbox = this.refs.MorningCheckbox;
    var AfternoonCheckbox = this.refs.AfternoonCheckbox;
    var NightCheckbox = this.refs.NightCheckbox;
    var NameInput = this.refs.NameInput;

    if (NameInput.value != '' && NightCheckbox.checked || MorningCheckbox.checked || AfternoonCheckbox.checked) {
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
                  lat: location.lat().toString(),
                  lng: location.lng().toString(),
                  name: NameInput.value,
                  morning: MorningCheckbox.checked,
                  afternoon: AfternoonCheckbox.checked,
                  night: NightCheckbox.checked
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

          var img = document.createElement('img');
          img.src = "https://d30y9cdsu7xlg0.cloudfront.net/png/6156-200.png";
          img.style.height = '30px';

          var morning = document.createElement('td');
          if (m.morning) morning.appendChild(img.cloneNode());
          tr.appendChild(morning);

          var afternoon = document.createElement('td');
          if (m.afternoon) afternoon.appendChild(img.cloneNode());
          tr.appendChild(afternoon);

          var night = document.createElement('td');
          if (m.night) night.appendChild(img.cloneNode());
          tr.appendChild(night);

          tbody.appendChild(tr);
        }

        this.setState({ markers: markers });
      });
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
      mainButton.textContent = 'Show Spots Info';
      placeForm.style.display = 'block';
      placeList.style.display = 'none';
    }
  }

  mapModeClickHandler() {
    this.setState({ addingMarker: !this.state.addingMarker });
    this.updateButtons();
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
}

window.onload = () => {
  var app = () => { return (<View/>); };
  ReactDOM.render(React.createElement(app), document.getElementsByTagName('mount')[0]);
}
