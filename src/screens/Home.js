import React from 'react'

class Home extends React.Component {
  constructor() {
    super()
    this.store = {
      input_size: 0,
      prev_input: ""
    }
  }

  on_change_handler(ev) {
    console.log(ev)
  }

  render() {
    return (
      <div>
        <h1>Where to code</h1>
        <input type="text" onchange={this.on_change_handler.bind(this)}></input>
      </div>
    )
  }
}

export default Home