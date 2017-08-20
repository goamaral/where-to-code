import axios from 'axios';
import React from 'react';

import { googleApiKey } from 'config';
import { greenMarker } from 'data';
import { CustomFeatures } from 'style/LocationStyle';
import { reactNodeToNativeNode } from 'helpers';
import { fade } from 'animation';

function Global() {
  this.vars = {
    map: null,
    newMarker: null,
    addingMarker: false,
    markers: null
  };

  this.update = function(obj) {
    this.vars = { ...this.vars, ...obj };
  }
}

// Global variables object
var global = new Global();

function fetchMarkers() {
  var location = document.title.replace(' ','').split(','),
      placeList = document.getElementById('placeList');

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

  return new Promise(function(resolve, reject) {
    axios.post('/json/markers', params)
      .then((res) => {
        var markers = [];
        var tbody = placeList.childNodes[1].childNodes[3];

        while (tbody.firstChild) {
          tbody.removeChild(tbody.firstChild);
        }

        for (var m of res.data.markers) {
          m = JSON.parse(m);
          m = { ...m, lat: parseFloat(m.lat), lng: parseFloat(m.lng) }
          markers.push(m);

          var data = function() {
            return(
              <tr>
                <td>{ m.name }</td>
                <td>{ m.opening.toString() + ' - ' + m.closing.toString() }</td>
                <td>{ wifiImage() }</td>
                <td>{ spotRating() }</td>
              </tr>
            );
          }

          tbody.appendChild(reactNodeToNativeNode(data));
        }

        global.update({ markers: markers });
        resolve();

        // Spot rating function
        function spotRating() {
          if (m.rating == 0) {
            return 'No rating';
          } else {
            return m.rating.toFixed(1).toString() + ' / 5.0'
          }
        }

        // Wifi image
        function wifiImage() {
          if (m.wifi) {
            return (
              <img
                src="https://d30y9cdsu7xlg0.cloudfront.net/png/6156-200.png"
                style={{ height: '30px' }}
              />
            );
          }
        }
      });
  });
}

function generateHours() {
  var numbers = [],
      out     = [];

  for (var i = 1; i <= 24; ++i) {
    var el = document.createElement('option');
    el.innerHTML = i;
    out.push(el);
  }

  return out;
}

function toggleSpotFormDisplay() {
  var mainButton = document.getElementById('mapMode'),
      placeForm  = document.getElementById('placeForm'),
      placeList  = document.getElementById('placeList');

  global.vars.addingMarker = !global.vars.addingMarker;

  if (!global.vars.addingMarker) {
    mainButton.textContent = 'Add Spot';
    placeForm.style.display = 'none';
    placeList.style.display = 'block';
  } else {
    mainButton.textContent = 'Show Spots';
    placeForm.style.display = 'block';
    placeList.style.display = 'none';
  }
}

function submitClickHandler() {
  var nameInput     = document.getElementById('nameInput'),
      openingHour   = document.getElementById('openingHour'),
      closingHour   = document.getElementById('closingHour'),
      wifiAvailable = document.getElementById('wifiAvailable'),
      mapWarning    = document.getElementById('mapWarning'),
      nameWarning   = document.getElementById('nameWarning'),
      warnings      = [],
      formFilled    = true;

  if (nameInput.value == '') {
    warnings.push('name');
    formFilled = false;
  }

  if (formFilled) {
    if (global.vars.newMarker != null) {
      var location = global.vars.newMarker.internalPosition;

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
                name: nameInput.value,
                opening: openingHour.value,
                closing: closingHour.value,
                wifi: wifiAvailable.checked
              }).then((res) => {
                global.vars.newMarker.setMap(null);
                global.update({ addingMarker: false, newMarker: null, markers: null });
              });
            }
          });
        }
      });
    } else {
      displayWarning(mapWarning, 'Marker not placed');
    }
  } else {
    for (var warn of warnings) {
      if (warn == 'name') displayWarning(nameWarning, 'Fill the spot name');
    }
  }
}

function displayWarning(elem, msg) {
  elem.innerHTML = '';

  var label = document.createElement('label');
  label.innerHTML = msg;
  label.style.color = '#ff3333';

  elem.appendChild(label);

  fade(elem, 3000, 500);
}

function loadMap() {
  var address = document.title;
  var div = document.getElementById('googleMap');

  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey;
  document.head.appendChild(script);

  return new Promise(function(success, failure) {
    script.onload = function() {
      new google.maps.Geocoder().geocode( { 'address': address}, (res, sts) => {
        if (sts == google.maps.GeocoderStatus.OK) {
          var zoom = calculateZoom(res[0].types);

          var coord = {
            lat: res[0].geometry.location.lat(),
            lng: res[0].geometry.location.lng()
          };

          var map = new google.maps.Map(div, {
            zoom: zoom,
            center: coord,
            styles: CustomFeatures
          });

          global.update({ map: map });
          success();
        } else {
          failure('sts != google.maps.GeocoderStatus.OK');
        }
      });
    }
  });

  function calculateZoom(types) {
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

function appendChildren(parent, nodes) {
  for (var node of nodes) {
    parent.appendChild(node);
  }
}

window.onload = function() {
  // Elements
  var mapModeButton     = document.getElementById('mapMode'),
      openingHourSelect = document.getElementById('openingHour'),
      closingHourSelect = document.getElementById('closingHour'),
      submitButton      = document.getElementById('submit'),
      googleMap         = document.getElementsByTagName('googleMap')[0];

  // Generate hours options
  appendChildren(openingHourSelect, generateHours());
  appendChildren(closingHourSelect, generateHours());

  // Buttons click event listeners
  mapModeButton.onclick = toggleSpotFormDisplay;
  submitButton.onclick  = submitClickHandler;

  // Google map
  loadMap()
    .then(() => {
    // Google map click event listener
    global.vars.map.addListener('click', ev => {
      if (global.vars.addingMarker) {
        if (global.vars.map.getZoom() >= 17) {
          var coor = {
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng()
          };

          var marker = new google.maps.Marker({
              icon: greenMarker,
              position: coor,
              map: global.vars.map
          });

          if (global.vars.newMarker != null) {
            global.vars.newMarker.setMap(null);
          }

          global.update({ newMarker: marker });
        } else {
          var mapWarning = document.getElementById('mapWarning');
          displayWarning(mapWarning, 'Please zoom for more acurate marking');
        }
      }
    });

    // Fetch markers
    fetchMarkers()
      .then(() => {
        if (global.vars.markers.length != 0) {
          for (var m of global.vars.markers) {
            var coor = {
              lat: m.lat,
              lng: m.lng
            }

            new google.maps.Marker({
                position: coor,
                map: global.vars.map
              });
          }
        }
      });
  });
}
