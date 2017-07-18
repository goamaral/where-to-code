import React, { Component } from 'react';
import { Column } from 'components/flexGrid';

class List extends Component {
  renderData() {
    return this.props.data.map((item, key) => {
      return (<ListItem style={this.props.itemStyle} key={parseInt(key, 10)} data={item} />);
    });
  }

  render() {
    return (
      <Column style={this.props.style}>
        {this.renderData()}
      </Column>
    );
  }
}

class ListItem extends Component {
  render() {
    return (
      <li style={this.props.style}>{this.props.data}</li>
    );
  }
}

export { List, ListItem };
