import React from 'react'
import { Link } from 'react-router-dom'

const BookCards = (props) => {
  return props.books.map((book, index) => {
    return (
      <div class="col-lg-3 col-md-4 col-sm-6" key={index}>
        <div class="thumb-wrapper">
          <div class="img-box">
            <img src={`http://localhost/assets/bookcover/${book.book_cover_photo!==null && book.book_cover_photo.match(/\d+$/)[0]>=1 && book.book_cover_photo.match(/\d+$/)[0]<=10 ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt=""></img>
          </div>
          <div class="thumb-content">
            <p><Link to={`/book?id=${book.id}`}><b>{`${book.book_title}`}</b></Link><br/><i>{`${book.author.author_name}`}</i></p>
            <p class="item-price">
              {book.book_price !== book.final_price ? (
                <strike>{`$${book.book_price}`}</strike>
              ): null}
              <span><strong>{`$${book.final_price}`}</strong></span>
            </p>
          </div>
        </div>
      </div>
    )
  })
}

export default BookCards
