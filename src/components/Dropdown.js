import React, { Component } from 'react';
import { List } from 'components/List';

class Dropdown extends Component {
  render() {
    return (
      <List
          style={{ ...this.style.dropdown, ...this.generateListStyle(), ...this.props.style }}
          data={this.props.data}
          width={this.props.width}
          itemStyle={{ borderTop: '#BDBDBD solid 1px ' }}
      />
    );
  }

  generateListStyle() {
    if (this.props.visible) {
      return { display: 'block' }
    } else return { display: 'none' }
  }

  style = {
    dropdown: {
      backgroundColor: 'white',
      borderRadius: '0 0 5px 5px'
    }
  }
}

export { Dropdown };
