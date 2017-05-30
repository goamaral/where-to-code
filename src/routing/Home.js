import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Core, Header, SearchBar, ListItem } from '../components';
import { updateInput } from '../actions/HomeActions';
import { LOCATION_CHANGED } from '../actions/types';

class Home extends Component {
  listMore = false;

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
          extraChildren={this.generateExtraChildren()}
        />
      </Core>
    );
  }

  processData() {
    let data = this.filterData()
    return data.map((item) => {
      return (<Link to={'/location/' + item}>{item}</Link>);
    });
  }

  generateExtraChildren() {
    let out = [
      <Link to={'/newLocation'}>
        <ListItem key='extraChild' style={{ borderRadius: '0 0 4px 4px' }}  data="Can't find it? Please add it :)" />
      </Link>
    ];

    if (this.listMore) {
      out.unshift(
        <Link to={'/searchResults'}>
          <ListItem key='extraChild2' data="..." />
        </Link>
      );
    }
    return out;
  }

  filterData() {
    let out = this.props.locationData.filter((item) => {
      return item.toLowerCase().includes(this.props.location.toLowerCase());
    });
    this.listMore = out.length > 5;
    out = out.splice(0,5);
    return out;
  }

  updateInputValue(value) {
    this.props.updateInput(value, LOCATION_CHANGED);
  }
}

const mapStateToProps = (state) => {
  let { home } = state;
  let { locationData, location } = home;

  return { locationData, location };
};

export default connect(mapStateToProps, { updateInput }) (Home);
