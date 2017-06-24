import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from 'routing/Home';
import Location from 'routing/Location';
import 'style.css';

const Router = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path={'/location/:location'} component={Location}/>
    </div>
  </BrowserRouter>
);

export default Router;
