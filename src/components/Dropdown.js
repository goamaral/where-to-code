import React, { Component } from 'react';

export default class Dropdown extends Component {
  render() {
    return (
      <div className="dropdown is-active">
        <div className="dropdown-trigger">
          <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
           onClick={ this.props.onClick}>
            <span>Dropdown button</span>
            <span className="icon is-small">
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content hidden">
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}
