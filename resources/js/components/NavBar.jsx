import React from 'react'
import { Link } from 'react-router-dom';

import { Nav, Navbar } from 'react-bootstrap'

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand as={Link} to="/">Bookworm</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
        <Nav.Link as={Link} to="/about">About</Nav.Link>
        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar
