import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './home.css'

import { SearchBox } from '../components'
import { actions } from '../redux/actions'

const Home = props => {
  let store = { input: '' }
  const search_spots = () => {
    props.set_location(store.input)
    props.history.push('/search_spots')
  }

  return (
    <div id='home'>
      <div id='top'>
        <a href='#' className='button'>Register</a>
        <a href='#' className='button'>Login</a>
      </div>

      <div id='body'>
        <p className='title'>Where to code</p>

        <SearchBox
          placeholder='Search coding spots around an address'
          store={store.input}
          onChange={ev => store.input = ev.target.value}
          onSubmit={search_spots}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  set_location: location => dispatch(actions.set_location(location))
})

export default connect(null, mapDispatchToProps)(withRouter(Home))
