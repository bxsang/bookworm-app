import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  clearCart,
} from '../actions/cart'
import OrderService from '../services/orders'
import { formatCurrency } from '../helpers/currency-formatter'

const Cart = (props) => {
  const dispatch = useDispatch()

  let cartTotals = 0.0

  const handleIncrease = (bookId, price) => {
    dispatch(increaseQuantity(bookId))
    cartTotals += price
    console.log(`increase ${bookId}`)
  }

  const handleDecrease = (bookId, price, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decreaseQuantity(bookId))
      cartTotals += price
      console.log(`decrease ${bookId}`)
    } else if (currentQuantity === 1) {
      dispatch(deleteItem(bookId))
      cartTotals += price
      console.log(`delete ${bookId}`)
    }
  }

  const handlePlaceOrder = () => {
    const booksToOrder = { user_id: 1, books: [] }
    for (const book in props.cartItems) {
      booksToOrder.books.push({
        book_id: book,
        quantity: props.cartItems[book].quantity,
      })
    }

    OrderService.addOrder(booksToOrder)
      .then((response) => {
        if (response.success) {
          dispatch(clearCart())
          alert('Order success!!')
        } else {
          alert('Order failed')
        }
      })
      .catch((error) => console.log(error))
  }

  return (
    <Container>
      <h4>Your cart: {Object.keys(props.cartItems).length} items</h4>
      <hr />
      <div className="row">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <Table hover id="table-cart" style={{ border: '#999 solid 1px' }}>
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Product</th>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(props.cartItems).map((item, index) => {
                const book = props.cartItems[item]
                cartTotals += parseFloat(
                  (book.final_price * book.quantity).toFixed(2)
                )
                return (
                  <tr key={index}>
                    <td>
                      <img
                        src={`http://localhost/assets/bookcover/${
                          book.book_cover_photo !== null &&
                          book.book_cover_photo.match(/\d+$/)[0] >= 1 &&
                          book.book_cover_photo.match(/\d+$/)[0] <= 10
                            ? book.book_cover_photo
                            : 'default'
                        }.jpg`}
                        className="img-fluid"
                        alt=""
                      />
                    </td>
                    <td>
                      <p>
                        <strong>{book.book_title}</strong>
                      </p>
                      <p>{book.author_name}</p>
                    </td>
                    <td>
                      <strong>{formatCurrency(book.final_price)}</strong>
                      {book.book_price !== book.final_price ? (
                        <p>
                          <strike>{formatCurrency(book.book_price)}</strike>
                        </p>
                      ) : null}
                    </td>
                    <td>
                      <span className="number">
                        <a
                          className="btn"
                          onClick={() =>
                            handleDecrease(item, book.book_price, book.quantity)
                          }
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </a>
                        <input
                          style={{ width: '20%' }}
                          id="buy-quantity"
                          type="text"
                          name="buy-quantity"
                          value={book.quantity}
                        />
                        <a
                          className="btn"
                          onClick={() => handleIncrease(item, book.book_price)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </a>
                      </span>
                    </td>
                    <td>
                      <strong>
                        {formatCurrency(
                          parseFloat(
                            (book.final_price * book.quantity).toFixed(2)
                          )
                        )}
                      </strong>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-center">
              <strong>Cart Totals</strong>
            </div>
            <div className="card-body">
              <h2 className="d-flex justify-content-center">
                <strong>{formatCurrency(cartTotals)}</strong>
              </h2>
              <Button
                style={{ width: '100%' }}
                variant="secondary"
                className="mt-3"
                onClick={handlePlaceOrder}
              >
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => {
  const data = {
    cartItems: { ...state.cart.items },
  }
  return data
}

export default connect(mapStateToProps)(Cart)
