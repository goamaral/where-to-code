import React, { Component } from 'react';

class Input extends Component {
  render() {
    return (
      <input
        type="text"
        style={{ ...this.props.style }}
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
}

class Header extends Component {
  render() {
    return (
      <h1 style={this.props.style}>
        {this.props.children}
      </h1>
    );
  }
}

export { Input, Header };
