import React, { Component } from 'react';
import { Column } from 'components/flexGrid';

class List extends Component {
  style = {
    div: {
      width: this.props.width,
    }
  }

  renderData() {
    return this.props.data.map((item, key) => {
      return (<ListItem style={this.props.itemStyle} key={parseInt(key, 10)} data={item} />);
    });
  }

  render() {
    return (
      <Column style={{ ...this.style.div, ...this.props.style }}>
        {this.renderData()}
      </Column>
    );
  }
}

class ListItem extends Component {
  style = {
    item: {
      padding: '10px 15px',
      marginBottom: '-1px',
      width: '100% '
    }
  }
  render() {
    return (
      <div style={{ ...this.style.item, ...this.props.style }}>{this.props.data}</div>
    );
  }
}

export { List, ListItem };
