import React from 'react'

import './search_box.css'

const SearchBox = props => {
  return (
    <div id='search_box'>
      <input
        className='input'
        placeholder={props.placeholder}
        type="text"
        onChange={props.onChange}>
      </input>

      <a onClick={ev => { ev.preventDefault; props.onSubmit() }} className='button'>
          Search
      </a>
    </div>
  )
}

export default SearchBox