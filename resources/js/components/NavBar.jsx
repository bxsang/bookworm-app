import React from 'react'

import { Nav, Navbar } from 'react-bootstrap'

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">Bookworm</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse>
      <Nav className="ml-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Shop</Nav.Link>
        <Nav.Link href="#link">About</Nav.Link>
        <Nav.Link href="#link">Cart</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavBar
