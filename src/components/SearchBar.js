import React, { Component } from 'react';
import { Dropdown } from 'components/Dropdown';
import { Column } from 'components/flexGrid';

class SearchBar extends Component {
  state = {
    dropdownVisible: false
  };

  render() {
    return (
      <Column>
        <input
          type='text'
          placeholder={this.props.placeholder}
          value={this.props.state}
          style={{ ...this.props.style.input, ...this.generateInputStyle() }}
          onChange={this.onChange.bind(this)}
        />
        <Dropdown
          data={this.props.data}
          visible={this.state.dropdownVisible}
          style={this.props.style.dropdown}
        />
      </Column>
    );
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

export { SearchBar };
