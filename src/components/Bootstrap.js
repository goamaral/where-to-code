import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input
        type="text"
        style={{ ...this.style.input, ...this.props.style }}
        placeholder={this.props.placeholder}
        onChange={this.onChange.bind(this)}
        value={this.props.state}
      />
    );
  }

  onChange(ev) {
    this.props.updateState(ev.target.value);
    this.props.onChange(ev.target.value);
  }

  style = {
    input: {
      width: this.props.width,
      height: this.props.height,
      padding: '10px',
      textAlign: 'center',
      fontSize: '1.3em',
      border: '1px solid rgb(221, 221, 221)',
      backgroundColor: 'white'
    }
  }
}

class SpanButton extends Component {
  render() {
    return (
      <span
        style={this.style.span}
        className={this.className()}
        onClick={this.props.onClick}
      />
    );
  }

  className() {
    return "input-group-addon btn" + this.props.className;
  }

  style = {
    span: {
      width: this.props.width,
      height: this.props.height,
      padding: '10px',
      textAlign: 'center',
      fontSize: '1.3em',
      marginBottom: '2px',
      borderRadius: '5px',
      margin: '20px'
    }
  }
}

class Header extends Component {
  render() {
    return (
      <h1 style={{ ...this.style.h1, ...this.props.style }}>
        {this.props.children}
      </h1>
    );
  }

  style = {
    h1: {
      fontSize: this.props.fontSize,
      margin: '20px'
    }
  }
}

export { Input, Header, SpanButton };
