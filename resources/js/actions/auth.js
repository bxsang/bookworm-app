import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from './types'

import AuthService from '../services/auth'

export const register = (info) => (dispatch) => {
  return AuthService.register(info).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: response,
      })

      return Promise.resolve()
    },
    (error) => {
      dispatch({
        type: REGISTER_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
      })

      return Promise.reject()
    }
  )
}

export const login = (credentials) => (dispatch) => {
  return AuthService.login(credentials).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response },
      })

      return Promise.resolve()
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: error.message,
      })

      return Promise.reject()
    }
  )
}

export const logout = () => (dispatch) => {
  AuthService.logout()

  dispatch({
    type: LOGOUT,
  })
}
