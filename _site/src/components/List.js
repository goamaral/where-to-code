import React, { Component } from 'react';
import { Column } from 'components/flexGrid';

class List extends Component {
  // Render
  render() {
    return (
      <Column style={{ ...this.style, ...this.props.style }} className={this.props.className}>
        {this.renderData()}
      </Column>
    );
  }

  // Helpers
  renderData() {
    return this.props.data.map((item, key) => {
      return (
        <ListItem
          key={parseInt(key, 10)}
          data={item}
          className={this.props.classNameItem}
        />
      );
    });
  }

  // Constructor
  constructor() {
    super();

    this.style = {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: '0 0 5px 5px'
    }
  }
}

class ListItem extends Component {
  // Render
  render() {
    return (
      <li className={this.props.className}
       style={this.style}>
        {this.props.data}
      </li>
    );
  }

  // Constructor
  constructor() {
    super();

    this.style = {
      padding: '10px 15px',
      marginBottom: '-1px',
      width: '100%',
      borderTop: '1px solid #BDBDBD',
      listStyleType: 'none',
      textAlign: 'center'
    }
  }
}

export { List, ListItem };
