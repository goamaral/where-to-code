import React, { Component } from 'react';
import { List } from 'components/List';

class Dropdown extends Component {
  render() {
    return (
      <List
          style={this.generateListStyle()}
          data={this.props.data}
          width={this.props.width}
      />
    );
  }

  generateListStyle() {
    if (this.props.visible) {
      return { display: 'block' }
    } else return { display: 'none' }
  }
}

export { Dropdown };
