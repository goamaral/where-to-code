import React, { Component } from 'react';
import { Row } from './flexGrid';

class SearchInput extends Component {
  style = {
    input: {
      width: this.props.width,
      height: this.props.height,
      padding: '10px',
      textAlign: 'center',
      fontSize: '1.3em'
    },
    span: {
      width: Math.round(parseInt(this.props.width, 10)/7),
      height: this.props.height,
      padding: '10px',
      textAlign: 'center',
      fontSize: '1.3em',
      marginBottom: '2px'
    }
  }

  render() {
    return (
      <Row style={{ margin: '20px' }}>
        <input style={this.style.input} type="text" className="form-control" placeholder={this.props.placeholder} />
        <span style={this.style.span} className="input-group-addon btn glyphicon glyphicon-search" />
      </Row>
    );
  }
}

class H1 extends Component {
  render() {
    return (
      <h1 style={{ fontSize: this.props.fontSize, margin: '20px' }}>{this.props.children}</h1>
    );
  }
}

export { SearchInput, H1 };
