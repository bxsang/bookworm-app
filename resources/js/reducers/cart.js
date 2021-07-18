import { ADD_CART } from '../actions/types'

const cart = JSON.parse(localStorage.getItem('cart'))

const initialState = cart ? { items: cart } : { items: null }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case ADD_CART:
      return {
        ...state,
        items: payload,
      }
    default:
      return state
  }
}
