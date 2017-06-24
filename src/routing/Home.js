import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Core, Header, SearchBar, ListItem } from 'components';
import { fetchLocations, updateLocation } from 'actions/HomeActions';

class Home extends Component {
  render() {
    return (
      <Core>
        <Header style={{ marginBottom: '8vh' }} fontSize='4em'>Where to code?</Header>
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
      return (<Link to={'/location/' + item}>{item}</Link>);
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
