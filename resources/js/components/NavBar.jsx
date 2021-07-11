import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { Nav, Navbar } from 'react-bootstrap'

import { logout } from "../actions/auth"

class NavBar extends Component {
  constructor(props) {
    super(props)
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
  }

  render() {
    const {currentUser} = this.state

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Bookworm</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            {currentUser ? (
              <div>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={this.logOut}>Logout</Nav.Link>
              </div>
            ): (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(NavBar);
