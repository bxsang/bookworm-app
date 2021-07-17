import React, { useState, useEffect } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BooksService from '../services/books'
import { useParams } from 'react-router-dom'

function getBook(bookId) {
  return BooksService.getOneBook(bookId)
}

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(undefined)
  const [buyQuantity, setBuyQuantity] = useState(1)

  useEffect(() => {
    getBook(id).then((response) => {
      setBook(response)
    })
  }, [])

  const increaseBuyQuantity = () => {
    setBuyQuantity(buyQuantity + 1)
  }

  const decreaseBuyQuantity = () => {
    if (buyQuantity > 1) {
      setBuyQuantity(buyQuantity - 1)
    }
  }

  if (typeof book === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h2>{book.category.category_name}</h2>
      <hr />
      <div className="row book-detail">
        <div className="col-sm-8 col-md-8 col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3">
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
                  <p className="d-flex justify-content-end">
                    <i>By &nbsp;</i>
                    <b>{`${book.author.author_name}`}</b>
                  </p>
                </div>
                <div className="col-sm-9 col-md-9 col-lg-9">
                  <h3>
                    <b>{book.book_title}</b>
                  </h3>
                  <p>{book.book_summary}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Customer reviews</h3>
            </div>
            <div className="card-body">
              <h4>
                <b>{book.avg_star}&nbsp;Star</b>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4">
          <div className="card mb-4">
            <div className="card-header">
              <h3>
                {book.book_price !== book.final_price ? (
                  <strike>{`$${book.book_price}`}</strike>
                ) : null}
                <span>
                  <strong>{`$${book.final_price}`}</strong>
                </span>
              </h3>
            </div>
            <div className="card-body">
              <form className="add-cart">
                <p>Quantity</p>
                <span className="number">
                  <a className="btn" onClick={decreaseBuyQuantity}>
                    <FontAwesomeIcon icon={faMinus} />
                  </a>
                  <input
                    id="buy-quantity"
                    type="text"
                    name="buy-quantity"
                    value={buyQuantity}
                  />
                  <a className="btn" onClick={increaseBuyQuantity}>
                    <FontAwesomeIcon icon={faPlus} />
                  </a>
                </span>
                <Button variant="secondary" className="mt-3">
                  Add to cart
                </Button>
              </form>
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Write a review</h3>
            </div>
            <div className="card-body">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add a title</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Detaill please! Your review helps other shoppers.
                  </Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Add a title</Form.Label>
                  <Form.Control as="select">
                    <option value="1">1 star</option>
                    <option value="2">2 star</option>
                    <option value="3">3 star</option>
                    <option value="4">4 star</option>
                    <option value="5">5 star</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="secondary" type="submit">
                  Submit Review
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default BookDetail
