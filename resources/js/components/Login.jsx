import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import { connect } from 'react-redux'
import { login } from '../actions/auth'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)

    this.state = {
      email: '',
      password: '',
      loading: false,
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  handleLogin(e) {
    e.preventDefault()

    this.setState({
      loading: true,
    })

    this.form.validateAll()

    const { dispatch, history } = this.props

    if (this.checkBtn.context._errors.length === 0) {
      const credentials = {
        email: this.state.email,
        password: this.state.password,
      }
      dispatch(login(credentials))
        .then(() => {
          history.push('/profile')
          window.location.reload()
        })
        .catch(() => {
          this.setState({
            loading: false,
          })
        })
    } else {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { isLoggedIn, message } = this.props

    if (isLoggedIn) {
      return <Redirect to="/profile" />
    }

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: 'none' }}
              ref={(c) => {
                this.checkBtn = c
              }}
            />
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth
  const { message } = state.message
  return {
    isLoggedIn,
    message,
  }
}

export default connect(mapStateToProps)(Login)
