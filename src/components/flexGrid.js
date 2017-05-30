import React, { Component } from 'react';

class Row extends Component {
  style = {
    row: {
      display: 'flex',
      width: '100%',
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
      height: '100%',
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
  render() {
    return (
      <div style={{height: '80vh'}}>
        <Column>
          <Row>
            <Column>
              {this.props.children}
            </Column>
          </Row>
        </Column>
      </div>
    );
  }
}

export { Row, Column, Core };
