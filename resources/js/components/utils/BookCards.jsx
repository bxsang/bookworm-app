import React from 'react'
import { Link } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { formatCurrency } from '../../helpers/currency-formatter'

const BookCards = (props) => {
  return props.books.map((book, index) => {
    return (
      <Col lg={3} md={4} sm={6} key={index}>
        <div className="thumb-wrapper">
          <div className="img-box">
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
            ></img>
          </div>
          <div className="thumb-content">
            <p>
              <Link to={`/book/${book.id}`}>
                <b>{`${book.book_title}`}</b>
              </Link>
              <br />
              <i>{`${book.author.author_name}`}</i>
            </p>
            <p className="item-price">
              {book.book_price !== book.final_price ? (
                <strike>{formatCurrency(book.book_price)}</strike>
              ) : null}
              <strong>{formatCurrency(book.final_price)}</strong>
            </p>
          </div>
        </div>
      </Col>
    )
  })
}

export default BookCards
