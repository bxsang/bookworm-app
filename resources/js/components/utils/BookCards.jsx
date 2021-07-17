import React from 'react'
import { Link } from 'react-router-dom'

const BookCards = (props) => {
  return props.books.map((book, index) => {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
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
                <strike>{`$${book.book_price}`}</strike>
              ) : null}
              <span>
                <strong>{`$${book.final_price}`}</strong>
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  })
}

export default BookCards
