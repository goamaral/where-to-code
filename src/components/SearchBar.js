import React, { Component } from 'react';
import { Column } from 'components/flexGrid';
import { List, ListItem } from 'components/List';

export default class SearchBar extends Component {
  state = {
    dropdownVisible: false
  };

  static defaultProps = {
    className: {}
  }

  render() {
    return (
      <Column>
        <input
          type='text'
          placeholder={this.props.placeholder}
          value={this.props.state}
          style={{ ...this.props.style.input, ...this.generateInputStyle() }}
          onChange={this.onChange.bind(this)}
          className={this.props.className.input}
        />
        <List
          style={{ ...this.generateListStyle(), ...this.props.style.list }}
          className={this.props.className.list}
          data={this.props.data}
          itemStyle={this.props.style.listItem}
          itemClassName={this.props.className.listItem}
        />
      </Column>
    );
  }

  generateListStyle() {
    if (this.state.dropdownVisible) {
      return { display: 'block' }
    } else return { display: 'none' }
  }

  onChange(ev) {
    this.props.updateState(ev.target.value);
    this.toggleVisibility(ev.target.value);
  }

  toggleVisibility(value) {
    if (value === '') {
      this.setState({ dropdownVisible: false });
    } else this.setState({ dropdownVisible: true });
  }

  generateInputStyle() {
    let style = { margin: '0 0 -1px 0', borderRadius: '5px', outline: 'none' };
    if (this.state.dropdownVisible) {
      style.borderRadius = '5px 5px 0 0';
    }

    return style;
  }
}
