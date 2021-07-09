import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import Shop from './components/Shop'
import About from './components/About'
import Cart from './components/Cart'

const Routes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route exact path='/shop'>
      <Shop />
    </Route>
    <Route exact path='/about'>
      <About />
    </Route>
    <Route exact path='/cart'>
      <Cart />
    </Route>
  </Switch>
)

export default Routes
