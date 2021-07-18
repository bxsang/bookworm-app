/* eslint-disable no-unused-vars */
import { GET_CART, ADD_CART } from './types'

const cart = JSON.parse(localStorage.getItem('cart')) || {}

export const addToCart = (book) => (dispatch) => {
  if (Object.keys(cart).includes(Object.keys(book)[0])) {
    cart[Object.keys(book)] += book[Object.keys(book)]
  } else {
    cart[Object.keys(book)] = book[Object.keys(book)]
  }
  localStorage.setItem('cart', JSON.stringify(cart))

  dispatch({
    type: ADD_CART,
    payload: cart,
  })
}
