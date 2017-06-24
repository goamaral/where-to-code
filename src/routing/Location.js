import React, { Component } from 'react';
import { Header } from 'components';

class Location extends Component {
  render() {
    console.log(this.props);
    return (
      <Header style={{ marginBottom: '6vh' }} fontSize='4em'>{this.props.match.params.location}</Header>
    );
  }
}

export default Location;
