import React from 'react'

import Map from '../components/Map'

import './search_spots.css'

const SearchSpots = () => {
  return (
    <div id='search_spots'>
      <div id='top'>
        <a href='#' className='button'>Register</a>
        <a href='#' className='button'>Login</a>
      </div>

      <div id='body'>
        <a href='/' className='title'>Where to code</a>

        <div className='row'>
          <div className='column'>
            <Map className='map'></Map>
            <a className='button' href='/add_spot'>Add new coding spot</a>
          </div>

          <div className='column'>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSpots