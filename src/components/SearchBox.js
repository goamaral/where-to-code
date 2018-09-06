import React from 'react'

import './search_box.css'

class SearchBox extends React.Component {
  render() {
    return (
      <div id='search_box'>
        <input
          className='input'
          placeholder={this.props.placeholder}
          type="text"
          ref={this.props.inputRef}>
        </input>

        <a onClick={this.props.onSubmit} className='button'>
            Search
        </a>
      </div>
    )
  }
}

export default SearchBox