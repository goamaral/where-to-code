import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Core, Header, SearchBar, ListItem } from 'components';
import { fetchLocations, updateLocation } from 'actions/HomeActions';

class Home extends Component {
  render() {
    return (
      <Core style={{ height: '80vh' }}>
        <Header style={{ margin: '0 0 8vh 0', textAlign: 'center', color: 'white' }} fontSize='4em'>Where to code?</Header>
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

export default connect(mapStateToProps, { updateLocation, fetchLocations }) (Home);
