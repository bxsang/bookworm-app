import React, { Component } from 'react'
import { Container, Button, Nav, Tab, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { chunk } from 'lodash'

import BookCards from './utils/BookCards'
import BooksService from '../services/books'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onSaleBooks: undefined,
      recommendedBooks: undefined,
      popularBooks: undefined,
    }
  }

  componentDidMount() {
    this.getOnSaleBooks()
    this.getRecommendedBooks()
    this.getPopularBooks()
  }

  getOnSaleBooks() {
    BooksService.getOnSaleBooks().then((response) => {
      this.setState({
        onSaleBooks: response,
      })
    })
  }

  getRecommendedBooks() {
    BooksService.getRecommendedBooks().then((response) => {
      this.setState({
        recommendedBooks: response,
      })
    })
  }

  getPopularBooks() {
    BooksService.getPopularBooks().then((response) => {
      this.setState({
        popularBooks: response,
      })
    })
  }

  mapBooksSlide() {
    const books = chunk(this.state.onSaleBooks, 4)
    return books.map((chunks, index) => {
      return (
        <div
          className={`carousel-item ${index === 0 ? 'active' : ''}`}
          key={index}
        >
          <div className="row">
            <BookCards books={chunks} />
          </div>
        </div>
      )
    })
  }

  mapRecommendedBooks() {
    if (typeof this.state.recommendedBooks === 'undefined') {
      return <div>Loading...</div>
    }
    const books = this.state.recommendedBooks

    return <BookCards books={books} />
  }

  mapPopularBooks() {
    if (typeof this.state.popularBooks === 'undefined') {
      return <div>Loading...</div>
    }
    const books = this.state.popularBooks

    return <BookCards books={books} />
  }

  render() {
    return (
      <Container>
        <div className="d-flex justify-content-between">
          <h3>On Sale</h3>
          <Link to="/shop">
            <Button variant="secondary">View all</Button>{' '}
          </Link>
        </div>
        <div
          id="productCarousel"
          className="carousel slide"
          data-ride="carousel"
          data-interval="0"
        >
          <div className="carousel-inner">{this.mapBooksSlide()}</div>
          <a
            className="carousel-control-prev"
            href="#productCarousel"
            data-slide="prev"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
          <a
            className="carousel-control-next"
            href="#productCarousel"
            data-slide="next"
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </div>

        <div className="d-flex justify-content-center">
          <h3>Featured Books</h3>
        </div>
        <Tab.Container id="left-tabs-example" defaultActiveKey="recommended">
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="recommended">Recommended</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="popular">Popular</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="recommended">
              <div className="featured-books">
                <div className="book-item">
                  <Row>{this.mapRecommendedBooks()}</Row>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="popular">
              <div className="featured-books">
                <div className="book-item">
                  <Row>{this.mapPopularBooks()}</Row>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    )
  }
}

export default Home
