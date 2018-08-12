import React from 'react'

class Home extends React.Component {
  constructor() {
    super()
    this.store = {
      input_size: 0,
      input: ""
    }
  }

  on_change_handler(ev) {
    this.store.input = ev.target.value
  }

  render() {
    return (
      <div>
        <h1>Where to code</h1>
        <input type="text" onChange={this.on_change_handler.bind(this)}></input>
      </div>
    )
  }
}

export default Home