import React from 'react'

class SearchBox extends React.Component {
  render() {
    return (
      <div id={ this.props.id }>
        <input
          id='input'
          placeholder={this.props.placeholder}
          type="text"
          ref={this.props.inputRef}>
        </input>

        <a onClick={this.props.onSubmit} id='button'>
            Search
        </a>
      </div>
    )
  }
}

export default SearchBox