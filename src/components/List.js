import React, { Component } from 'react';
import { Column } from 'components/flexGrid';

class List extends Component {
  renderData() {
    return this.props.data.map((item, key) => {
      return (
        <ListItem
          style={this.props.itemStyle}
          key={parseInt(key, 10)}
          data={item}
          className={this.props.itemClassName}
        />
      );
    });
  }

  render() {
    return (
      <Column style={this.props.style} className={this.props.className}>
        {this.renderData()}
      </Column>
    );
  }
}

class ListItem extends Component {
  render() {
    return (
      <li style={this.props.style} className={this.props.className}>{this.props.data}</li>
    );
  }
}

export { List, ListItem };
