import React from 'react'

const BookCard = (props) => {
  return props.books.map((book, index) => {
    return (
      <div class="col-lg-3 col-md-4 col-sm-6" key={index}>
        <div class="thumb-wrapper">
          <div class="img-box">
            <img src={`http://localhost/assets/bookcover/${book.book_cover_photo!==null && book.book_cover_photo.match(/\d+$/)[0]>=1 && book.book_cover_photo.match(/\d+$/)[0]<=10 ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt=""></img>
          </div>
          <div class="thumb-content">
            <p><b>{`${book.book_title}`}</b><br/><i>{`${book.author.author_name}`}</i></p>
            <p class="item-price"><strike>{`$${book.book_price}`}</strike> <span>{`$${book.final_price}`}</span></p>
          </div>
        </div>
      </div>
    )
  })
}

export default BookCard
