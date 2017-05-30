import React, { Component } from 'react';
import { Core } from './flexGrid';
import { Header } from './Bootstrap';
import './style.css';
import SearchBar from './SearchBar';
import { ListItem } from './List';
import { updateInput } from './actions/inputActions';
import { connect } from 'react-redux';
import { LOCATION_CHANGED } from './actions/types';

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
          state={this.props.inputValues.locationData}
          data={this.filterData()}
          extraChildren={this.generateExtraChildren()}
        />
      </Core>
    );
  }

  generateExtraChildren() {
    let out = [<ListItem key='extraChild' style={{ borderRadius: '0 0 4px 4px' }}  data="Can't find it? Please add it :)" />];
    if (this.listMore) {
      out.unshift(<ListItem key='extraChild2' data="..." />)
    }
    return out;
  }

  filterData() {
    let out = this.props.data.locationData.filter((item) => {
      return item.toLowerCase().includes(this.props.inputValues.location.toLowerCase());
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
  let { data, inputValues } = state;

  return { data, inputValues };
};

export default connect(mapStateToProps, { updateInput }) (Home);
