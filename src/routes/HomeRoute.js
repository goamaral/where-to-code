import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Core, Header, SearchBar, ListItem } from 'components';
import { fetchLocations, updateLocation } from 'actions/HomeActions';

class Home extends Component {
  render() {
    return (
      <Core>
        <Header style={{ marginBottom: '8vh', textAlign: 'center' }} fontSize='4em'>Where to code?</Header>
        <SearchBar
          width='40vw'
          height='40px'
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
      return (<a href={'/location/' + item}>{item}</a>);
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

export default connect(mapStateToProps, { updateLocation, fetchLocations }) (Home);
