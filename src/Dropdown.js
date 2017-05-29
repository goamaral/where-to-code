import React, { Component } from 'react';
import { List, ListItem } from './List';

class Dropdown extends Component {
  render() {
    return (
      <List
          style={this.generateListStyle()}
          data={this.props.data}
          width={this.props.width}
          extraChild={<ListItem key='extraChild' style={{ borderRadius: '0 0 4px 4px' }}  data="Can't find it? Please add it :)" />}
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
