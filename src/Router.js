import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './reset.css'

import { Home, SearchSpots } from './screens'
import reducers from './redux/reducers'

const store = createStore(reducers)

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/search_spots' component={SearchSpots} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Router