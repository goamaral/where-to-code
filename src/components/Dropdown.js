import React, { Component } from 'react';
import { List } from 'components/List';

class Dropdown extends Component {
  render() {
    return (
      <List
          style={{ ...this.generateListStyle(), ...this.props.style.list }}
          data={this.props.data}
          itemStyle={this.props.style.listItemStyle}
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
