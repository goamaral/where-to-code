import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './css/home.css'

import SearchBox from '../components/SearchBox'
import { actions } from '../redux/actions'

const Home = props => {
  let searchbox_ref = React.createRef()

  const search_spots = () => {
    props.set_location(searchbox_ref.current.value)
    props.history.push('/search_spots')
  }

  return (
    <div id='home'>
      <div id='body'>
        <a href='/' id='title'>Where to code</a>

        <SearchBox
          id="search_box"
          placeholder='Search coding spots around an address'
          inputRef={searchbox_ref}
          onSubmit={search_spots}
        />
      </div>

      <a href='#' className='link'>Register</a>
      <a href='#' className='link'>Login</a>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  set_location: location => dispatch(actions.set_location(location))
})

export default connect(null, mapDispatchToProps)(withRouter(Home))
