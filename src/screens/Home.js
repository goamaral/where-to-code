import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './css/home.css'

import { actions } from '../redux/actions'

const Home = props => {
  let searchbox_ref = React.createRef()

  const search_spots = () => {
    props.set_location(searchbox_ref.current.value)
    props.history.push('/search_spots')
  }

  return (
    <div id='home' className="columns">
      <div id='body' className="column is-6 is-offset-3">
        <a href='/' id='title'>Where to code</a>

        <SearchBox inputRef={searchbox_ref} onSubmit={search_spots} />
      </div>

      <a href='#' className='column is-1 link'>Register</a>
      <a href='#' className='column is-1 link'>Login</a>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  set_location: location => dispatch(actions.set_location(location))
})

export default connect(null, mapDispatchToProps)(withRouter(Home))

class SearchBox extends React.Component {
  render() {
    return (
      <div id="search_box" className="columns">
        <input
          id="input"
          className="column"
          placeholder='Search coding spots around an address'
          type="text"
          ref={this.props.inputRef}>
        </input>

        <a id='button' className="column is-2" onClick={this.props.onSubmit}>
            Search
        </a>
      </div>
    )
  }
}