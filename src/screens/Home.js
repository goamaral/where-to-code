import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './home.css'

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
      <div id='top'>
        <a href='#' className='button'>Register</a>
        <a href='#' className='button'>Login</a>
      </div>

      <div id='body'>
        <a href='/' className='title'>Where to code</a>

        <SearchBox
          placeholder='Search coding spots around an address'
          inputRef={searchbox_ref}
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
