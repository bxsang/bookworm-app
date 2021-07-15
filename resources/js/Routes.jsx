import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

import Home from './components/Home'
import BookDetail from './components/BookDetail'
import Shop from './components/Shop'
import About from './components/About'
import Cart from './components/Cart'
import Login from './components/Login'
import Profile from './components/Profile'

const params = new URLSearchParams(window.location.search);

const Routes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route exact path='/book/:id'>
      <BookDetail />
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
    <Route exact path='/login'>
      <Login />
    </Route>
    <Route exact path='/profile'>
      <Profile />
    </Route>
  </Switch>
)

export default Routes
