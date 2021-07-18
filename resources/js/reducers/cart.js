/* eslint-disable no-unused-vars */
import {
  ADD_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  DELETE_ITEM,
  CLEAR_CART,
} from '../actions/types'

const cart = JSON.parse(localStorage.getItem('cart'))

const initialState = cart ? { items: cart } : { items: {} }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_CART:
      return {
        ...state,
        items: payload,
      }
    case INCREASE_QUANTITY:
      return {
        ...state,
        items: payload,
      }
    case DECREASE_QUANTITY:
      return {
        ...state,
        items: payload,
      }
    case DELETE_ITEM:
      return {
        ...state,
        items: payload,
      }
    case CLEAR_CART:
      return {
        ...state,
        items: {},
      }
    default:
      return state
  }
}
