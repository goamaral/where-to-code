import React, { Component } from 'react';

class Row extends Component {
  style = {
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  render() {
    return (
      <div style={{ ...this.style.row, ...this.props.style }}>
        { this.props.children }
      </div>
    );
  }
}

class Column extends Component {
  style = {
    column: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  render() {
    return (
      <div style={{ ...this.style.column, ...this.props.style }} className={this.props.className}>
        { this.props.children }
      </div>
    );
  }
}

class Core extends Component {
  style = {
    core: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
  }

  render() {
    return (
      <div style={{ ...this.style.core, ...this.props.style }}>
        {this.props.children}
      </div>
    );
  }
}

export { Row, Column, Core };
