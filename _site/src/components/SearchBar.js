import React, { Component } from 'react';
import { Column } from 'components/flexGrid';
import { List, ListItem } from 'components/List';

export default class SearchBar extends Component {
  // Render
  render() {
    return (
      <Column className={this.props.className} style={{ width: '100%' }}>
        <input
          type='text'
          value={this.props.state}
          placeholder={this.props.placeholder}
          style={this.generateInputStyle()}
          className={this.props.classNameInput}
          onChange={this.onChange.bind(this)}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
        />
        <List
          style={this.generateListStyle()}
          className={this.props.classNameList}
          itemClassName={this.props.classNameItem}
          data={this.filteredSuggestions()}
        />
      </Column>
    );
  }

  // Event handling
  onChange(ev) {
    this.props.updateState(ev.target.value);
  }

  onFocus() {
    if (!this.state.dropdownVisible && this.filteredSuggestions().length != 0) {
      this.setState({ dropdownVisible: true });
    }
  }

  onBlur(ev) {
    // Helpers
    var correctState = (store) => {
      if (!store.filled) {
        this.props.updateState('');
      } else if (store.filled && store.value != this.props.state.value) {
        this.props.updateState(store.value);
      }
    };

    // Main
    if (this.state.dropdownVisible) {
      this.setState({ dropdownVisible: false });
    }

    if (this.state.storeUpdatePromise != null) {
      this.state.storeUpdatePromise.then((store) => {
        correctState(store);
        this.setState({ storeUpdatePromise: null });
      });
    } else {
      correctState(this.props.store);
    }
  }

  // Helpers
  filteredSuggestions() {
    // Can be more efficient ( have to detect char deletion or insertion ).
    // On insetion use current filtered on deletion use prev filtered

    // Helpers
    var valueIsPresent = (target) => {
      var t = target.toLowerCase();
      var v = this.props.state.toLowerCase();

      for ( var l of v ) {
        if (!t.includes(l)) return false;
      }

      return true;
    }

    // Main
    var counter = 0;
    var filtered = [];

    this.props.suggestions.some(({ name }) => {
      if ( valueIsPresent(name) ) {
        ++counter;
        filtered.push(name);
      }

      return counter == 5;
    });

    return filtered.map((item) => {
      return (<a onMouseDown={this.suggectionSelectionHandler.bind(this)}>{item}</a>);
    });
  }

  suggectionSelectionHandler(ev) {
    this.setState({
      storeUpdatePromise: new Promise((resolve, reject) => {
        this.props.updateStore({ filled: true, value: ev.target.innerHTML });
        resolve({ filled: true, value: ev.target.innerHTML });
      })
    });
  }

  // Style generators
  generateInputStyle() {
    var style = {
      ...this.style,
      margin: '0 0 -1px 0',
      borderRadius: '3px',
      outline: 'none'
    };

    if (this.state.dropdownVisible) style.borderRadius = '5px 5px 0 0';

    return style;
  }

  generateListStyle() {
    if (this.state.dropdownVisible) return { display: 'block' };

    return { display: 'none' }
  }

  // Constructor
  constructor() {
    super();

    this.state = {
      dropdownVisible: false,
      storeUpdatePromise: null
    };

    this.style = {
      width: '100%',
      padding: '10px',
      textAlign: 'center',
      fontSize: '1rem',
      border: '1px solid #BDBDBD',
      backgroundColor: 'white',
      height: '40px'
    }
  }

  // Default props
  static defaultProps = {
    className: '',
    classNameInput: '',
    classNameList:'',
    classNameItem: ''
  }
}
