import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }} className="navbar navbar-default navbar-fixed-top">
        <h2 className="navbar-text">{this.props.title}</h2>
      </div>
    );
  }
}

export default Header;
