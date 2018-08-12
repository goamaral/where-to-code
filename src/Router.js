import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import { Home } from './screens'
//import reducer from './reducers'

//const store = createStore(reducer)

const Router = () => (
  //<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  //</Provider>
)

export default Router