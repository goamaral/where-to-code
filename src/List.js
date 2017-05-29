import React, { Component } from 'react';
import { Column } from './flexGrid';

class List extends Component {
  style = {
    div: {
      width: this.props.width,
    }
  }

  renderData() {
    let out = this.props.data.map((item, key) => {
      return (<ListItem key={key} data={item} />);
    });

    if (this.props.extraChild !== null) {
      out.push(this.props.extraChild);
    }

    return out;
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
      border: '1px solid #ddd',
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
