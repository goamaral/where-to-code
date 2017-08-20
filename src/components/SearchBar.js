import React, { Component } from 'react';
import { Column } from 'components/flexGrid';
import { List, ListItem } from 'components/List';

export default class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      dropdownVisible: false,
      value: ''
    };
  }

  static defaultProps = {
    // Fill defaultProps
    className: {}
  }

  render() {
    return (
      <Column>
        <input
          type='text'
          placeholder={this.props.placeholder}
          value={this.value}
          style={{ ...this.props.style.input, ...this.generateInputStyle() }}
          onChange={this.onChange.bind(this)}
          className={this.props.className.input}
        />
        <List
          style={{ ...this.generateListStyle(), ...this.props.style.list }}
          className={this.props.className.list}
          data={this.filteredSuggestions()}
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
    var val = ev.target.value;
    this.setState({ value: val });
    this.toggleVisibility(val);
  }

  filteredSuggestions() {
    // Can be more efficient ( have to detect char deletion or insertion ). On insetion use current filtered on deletion use prev filtered
    var counter = 0;
    var filtered = [];

    this.props.suggestions.some(({ name }) => {
      if ( this.valueIsPresent(name) ) {
        ++counter;
        filtered.push(name);
      }

      return counter == 5;
    });

    return filtered.map((item) => {
      return (<a>{item}</a>);
    });
  }

  valueIsPresent(target) {
    var t = target.toLowerCase();
    var v = this.state.value.toLowerCase();
    for ( var l of v ) {
      if (!t.includes(l)) return false;
    }

    return true;
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
