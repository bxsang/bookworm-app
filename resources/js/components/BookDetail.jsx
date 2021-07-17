import React, { useState, useEffect } from 'react'
import { Container, Button, Form, Dropdown } from 'react-bootstrap'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BooksService from '../services/books'
import { useParams } from 'react-router-dom'
import MyPagination from './utils/MyPagination'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(undefined)
  const [reviews, setReviews] = useState(undefined)
  const [buyQuantity, setBuyQuantity] = useState(1)
  const sortBy = [
    { date_desc: 'newest to oldest' },
    { date_asc: 'oldest to newest' },
  ]
  const perPageList = [10, 20, 30, 40, 50]
  const [currentSort, setCurrentSort] = useState('date_desc')
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const [currentStar, setCurrentStar] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    BooksService.getOneBook(id).then((response) => {
      setBook(response)
    })

    getBookReviews()
  }, [])

  const increaseBuyQuantity = () => {
    setBuyQuantity(buyQuantity + 1)
  }

  const decreaseBuyQuantity = () => {
    if (buyQuantity > 1) {
      setBuyQuantity(buyQuantity - 1)
    }
  }

  const getBookReviews = () => {
    BooksService.getBookReviews(
      id,
      currentSort,
      currentPerPage,
      currentStar
    ).then((response) => {
      setReviews(response)
    })
    console.log(reviews)
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
              <h4>Customer reviews (filter by {currentStar} star)</h4>
            </div>
            <div className="card-body">
              <h4>
                <b>{book.avg_star}&nbsp;Star</b>
              </h4>
              <div className="d-flex justify-content-start">
                <Button
                  variant="link"
                  onClick={() => {
                    setCurrentStar('all')
                    console.log(currentStar)
                    getBookReviews()
                  }}
                >{`Total (${book.reviews_count})`}</Button>
                {book.star_list.map((star, index) => {
                  return (
                    <Button
                      variant="link"
                      onClick={() => {
                        setCurrentStar(index + 1)
                        console.log(currentStar)
                        getBookReviews()
                      }}
                      key={index}
                    >{`${index + 1} star (${star})`}</Button>
                  )
                })}
              </div>
              {typeof reviews === 'undefined' ? (
                <div>Loading...</div>
              ) : (
                <>
                  <div className="d-flex justify-content-between mb-4">
                    <p>
                      Showing {reviews.meta.from}-{reviews.meta.to} of{' '}
                      {reviews.meta.total} reviews
                    </p>
                    <div>
                      <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="secondary">
                          {`Sort by date: ${sortBy[0][currentSort]}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {sortBy.map((item, index) => {
                            return (
                              <Dropdown.Item
                                onClick={() => {
                                  setCurrentSort(Object.keys(item)[0])
                                  getBookReviews()
                                  console.log(currentSort)
                                }}
                                key={index}
                              >
                                {item[Object.keys(item)[0]]}
                              </Dropdown.Item>
                            )
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                      <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle variant="secondary">
                          {`Show ${currentPerPage}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {perPageList.map((item, index) => {
                            return (
                              <Dropdown.Item
                                onClick={() => {
                                  setCurrentPerPage(item)
                                  getBookReviews()
                                  console.log(currentPerPage)
                                }}
                                key={index}
                              >
                                {item}
                              </Dropdown.Item>
                            )
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                  {reviews.data.map((review, index) => {
                    return (
                      <>
                        <p key={index}>
                          <strong>{review.review_title}</strong>
                          {' | '}
                          {`${review.rating_start} stars`}
                        </p>
                        <p>{review.review_details}</p>
                        <p>{review.review_date}</p>
                      </>
                    )
                  })}
                  <MyPagination
                    totPages={reviews.meta.last_page}
                    currentPage={currentPage}
                    pageClicked={(page) => {
                      setCurrentPage(page)
                      getBookReviews()
                    }}
                  ></MyPagination>
                </>
              )}
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
              <h4>Write a review</h4>
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
