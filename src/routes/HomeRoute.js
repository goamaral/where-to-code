import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Core, SearchBar, ListItem } from 'components';
import { fetchLocations, updateLocation } from 'actions/HomeActions';
import { HeaderStyle, CoreStyle, SearchBarStyle } from 'style/HomeStyle';

class HomeRoute extends Component {
  render() {
    return (
      <Core style={CoreStyle}>
        <h1 style={HeaderStyle}>Where to code?</h1>
        <SearchBar
          style={SearchBarStyle}
          placeholder="Please insert your city or country"
          updateState={this.updateInputValue.bind(this)}
          state={this.props.locationData}
          data={this.processData()}
        />
      </Core>
    );
  }

  processData() {
    return this.props.locations.map((item) => {
      return (<a style={{ textDecoration: 'none' }} href={'/location/' + item.description}>{item.description}</a>);
    });
  }

  updateInputValue(value) {
    this.props.updateLocation(value);
    this.props.fetchLocations(value);
  }
}

const mapStateToProps = (state) => {
  let { home } = state;
  let { locations, location } = home;

  return { locations, location };
};

export default connect(mapStateToProps, { updateLocation, fetchLocations }) (HomeRoute);
