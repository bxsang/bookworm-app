/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import { Nav, Navbar } from 'react-bootstrap'

import { logout } from '../actions/auth'

const NavBar = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  let sumCart = 0

  for (const ele in props.cartItems) {
    sumCart += props.cartItems[ele].quantity
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img
          alt="Home"
          src="/assets/bookworm_icon.svg"
          height="25"
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            {location.pathname === '/' ? (
              <b>
                <u>Home</u>
              </b>
            ) : (
              `Home`
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/shop">
            {location.pathname === '/shop' ? (
              <b>
                <u>Shop</u>
              </b>
            ) : (
              `Shop`
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            {location.pathname === '/about' ? (
              <b>
                <u>About</u>
              </b>
            ) : (
              `About`
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            {location.pathname === '/cart' ? (
              <b>
                <u>{`Cart (${sumCart})`}</u>
              </b>
            ) : (
              <>{`Cart (${sumCart})`}</>
            )}
          </Nav.Link>
          {/* {props.user ? (
            <>
              <Nav.Link as={Link} to="/profile">
                {location.pathname === '/profile' ? (
                  <b>
                    <u>Profile</u>
                  </b>
                ) : (
                  `Profile`
                )}
              </Nav.Link>
              <Nav.Link onClick={() => dispatch(logout())}>Logout</Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )} */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  const data = {
    user: { ...state.auth.user },
    cartItems: { ...state.cart.items },
  }
  return data
}

export default connect(mapStateToProps)(NavBar)
