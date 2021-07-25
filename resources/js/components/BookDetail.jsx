import React, { useState, useEffect } from 'react'
import {
  Container,
  Button,
  Form,
  Dropdown,
  Card,
  Row,
  Col,
} from 'react-bootstrap'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MyPagination from './utils/MyPagination'
import AlertDismissible from './utils/AlertDismissible'
import BooksService from '../services/books'
import ReviewService from '../services/review'
import { addToCart } from '../actions/cart'
import { formatCurrency } from '../helpers/currency-formatter'

const BookDetail = () => {
  const { id } = useParams()
  const [book, setBook] = useState(undefined)
  const [reviews, setReviews] = useState(undefined)
  const [buyQuantity, setBuyQuantity] = useState(1)
  const sortBy = {
    date_desc: 'newest to oldest',
    date_asc: 'oldest to newest',
  }
  const perPageList = [5, 10, 15, 20, 25]
  const [currentSort, setCurrentSort] = useState('date_desc')
  const [currentPerPage, setCurrentPerPage] = useState(5)
  const [currentStar, setCurrentStar] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewDetail, setReviewDetail] = useState('')
  const [reviewStar, setReviewStar] = useState('1')
  const [shouldUpdateReviews, setShouldUpdateReviews] = useState(false)
  const [addCartSuccess, setAddCartSuccess] = useState(false)
  const [addCartFailed, setAddCartFailed] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    BooksService.getOneBook(id).then((response) => {
      setBook(response)
    })

    setShouldUpdateReviews(true)
  }, [])

  useEffect(() => {
    if (shouldUpdateReviews) {
      getBookReviews()
      setShouldUpdateReviews(false)
    }
  }, [shouldUpdateReviews])

  const increaseBuyQuantity = () => {
    if (buyQuantity < 8) {
      setBuyQuantity(buyQuantity + 1)
    }
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
      currentStar,
      currentPage
    ).then((response) => {
      setReviews(response)
    })
    console.log(reviews)
  }

  const handleAddToCart = () => {
    const item = {}
    item[id] = {
      quantity: buyQuantity,
      book_title: book.book_title,
      author_name: book.author.author_name,
      book_price: book.book_price,
      final_price: book.final_price,
      book_cover_photo: book.book_cover_photo,
    }
    try {
      dispatch(addToCart(item))
      setAddCartSuccess(true)
    } catch (error) {
      console.log(error)
      setAddCartFailed(true)
    }
  }

  const handleReviewTitleChange = (event) => {
    setReviewTitle(event.target.value)
  }

  const handleReviewDetailChange = (event) => {
    setReviewDetail(event.target.value)
  }

  const handleReviewStarChange = (event) => {
    setReviewStar(event.target.value)
  }

  const handleReviewFormSubmit = (event) => {
    event.preventDefault()

    const review = {
      user_id: 1,
      book_id: id,
      review_title: reviewTitle,
      review_details: reviewDetail,
      rating_start: reviewStar,
    }

    ReviewService.addReview(review)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        alert('add review success')
        setShouldUpdateReviews(true)
      })
      .catch((error) => alert(error))
  }

  if (typeof book === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h2>{book.category.category_name}</h2>
      <hr />
      <Row className="book-detail">
        <Col sm={8} md={8} lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col sm={3} md={3} lg={3}>
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
                </Col>
                <Col sm={9} md={9} lg={9}>
                  <h3>
                    <b>{book.book_title}</b>
                  </h3>
                  <p>{book.book_summary}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>
              <h4>Customer reviews (filter by {currentStar} star)</h4>
            </Card.Header>
            <Card.Body>
              <h4>
                <b>{book.avg_star}&nbsp;Star</b>
              </h4>
              <div className="d-flex justify-content-start">
                <Button
                  variant="link"
                  onClick={() => {
                    setCurrentStar('all')
                    console.log(currentStar)
                    setShouldUpdateReviews(true)
                  }}
                >{`Total (${book.reviews_count})`}</Button>
                {book.star_list.map((star, index) => {
                  return (
                    <Button
                      variant="link"
                      onClick={() => {
                        setCurrentStar(index + 1)
                        console.log(currentStar)
                        setShouldUpdateReviews(true)
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
                          {`Sort by date: ${sortBy[currentSort]}`}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {Object.keys(sortBy).map((item, index) => {
                            return (
                              <Dropdown.Item
                                onClick={() => {
                                  setCurrentSort(item)
                                  setShouldUpdateReviews(true)
                                }}
                                key={index}
                              >
                                {sortBy[item]}
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
                                  setShouldUpdateReviews(true)
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
                        <Moment format="MMM D YYYY">
                          {review.review_date}
                        </Moment>
                        <hr />
                      </>
                    )
                  })}
                  <MyPagination
                    totPages={reviews.meta.last_page}
                    currentPage={currentPage}
                    pageClicked={(page) => {
                      setCurrentPage(page)
                      setShouldUpdateReviews(true)
                    }}
                  ></MyPagination>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4} md={4} lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h3>
                {book.book_price !== book.final_price ? (
                  <strike>{formatCurrency(book.book_price)}</strike>
                ) : null}
                <span>
                  <strong>{formatCurrency(book.final_price)}</strong>
                </span>
              </h3>
            </Card.Header>
            <Card.Body>
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
                <Button
                  variant="secondary"
                  className="mt-3"
                  onClick={handleAddToCart}
                >
                  Add to cart
                </Button>
              </form>
              <AlertDismissible
                variant="primary"
                message="Add book to cart success!!"
                show={addCartSuccess}
                setShow={setAddCartSuccess}
              />
              <AlertDismissible
                variant="danger"
                message="Add book to cart failed!!"
                show={addCartFailed}
                setShow={setAddCartFailed}
              />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>
              <h4>Write a review</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleReviewFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add a title</Form.Label>
                  <Form.Control
                    type="text"
                    value={reviewTitle}
                    maxLength="120"
                    onChange={handleReviewTitleChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>
                    Detaill please! Your review helps other shoppers.
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewDetail}
                    onChange={handleReviewDetailChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Select a rating star</Form.Label>
                  <Form.Control
                    as="select"
                    value={reviewStar}
                    onChange={handleReviewStarChange}
                  >
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default BookDetail
