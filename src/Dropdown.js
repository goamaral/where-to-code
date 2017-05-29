import React, { Component } from 'react';
import { List } from './List';

class Dropdown extends Component {
  render() {
    return (
      <List
          style={this.generateListStyle()}
          data={this.props.data}
          width={this.props.width}
          extraChildren={this.props.extraChildren}
      />
    );
  }

  generateListStyle() {
    if (this.props.visible) {
      return { display: 'block' }
    } else return { display: 'none' }
  }
}

export default Dropdown;
