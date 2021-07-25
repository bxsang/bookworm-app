import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { Container, Table, Button, Card, Row, Col } from 'react-bootstrap'
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
import AlertDismissible from './utils/AlertDismissible'

const Cart = (props) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [alertVariant, setAlertVariant] = useState('primary')
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  let cartTotals = 0.0
  let sumCart = 0

  for (const ele in props.cartItems) {
    sumCart += props.cartItems[ele].quantity
  }

  const handleIncrease = (bookId, price, currentQuantity) => {
    if (currentQuantity < 8) {
      dispatch(increaseQuantity(bookId))
      cartTotals += price
    }
  }

  const handleDecrease = (bookId, price, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decreaseQuantity(bookId))
      cartTotals += price
    } else if (currentQuantity === 1) {
      dispatch(deleteItem(bookId))
      cartTotals += price
    }
  }

  const handlePlaceOrder = () => {
    const booksToOrder = []
    for (const book in props.cartItems) {
      booksToOrder.push({
        book_id: book,
        quantity: props.cartItems[book].quantity,
      })
    }

    OrderService.addOrder(booksToOrder)
      .then((response) => {
        if (response.success) {
          dispatch(clearCart())
          doShowAlert(
            'Order success!! Redirecting to home page in 10 seconds...',
            true
          )
          setTimeout(() => {
            history.push('/')
          }, 10000)
        } else if (response.unavailable_books) {
          response.unavailable_books.forEach((bookId) => {
            dispatch(deleteItem(bookId))
          })
          doShowAlert(
            `Order failed!!! These books: ${response.unavailable_books.join()} are not available and will be removed from the cart.`,
            false
          )
        } else {
          dispatch(clearCart())
          doShowAlert('Order failed!!!', false)
        }
      })
      .catch((error) => {
        console.log(error)
        // dispatch(clearCart())
        doShowAlert('Order failed!!!', false)
      })
  }

  const doShowAlert = (message, isSuccess) => {
    setAlertVariant(`${isSuccess ? 'primary' : 'danger'}`)
    setAlertMessage(message)
    setShowAlert(true)
  }

  return (
    <Container>
      <h4>Your cart: {sumCart} items</h4>
      <hr />
      <Row>
        <Col sm={8} md={8} lg={8}>
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
                        <Link to={`/book/${item}`}>
                          <strong>{`${book.book_title}`}</strong>
                        </Link>
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
                          onClick={() =>
                            handleIncrease(item, book.book_price, book.quantity)
                          }
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
        </Col>
        <Col sm={4} md={4} lg={4}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-center">
              <strong>Cart Totals</strong>
            </Card.Header>
            <Card.Body>
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
              <AlertDismissible
                variant={alertVariant}
                message={alertMessage}
                show={showAlert}
                setShow={setShowAlert}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
