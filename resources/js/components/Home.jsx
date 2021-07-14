import React, {Component} from 'react'
import { Container, Row, Button, Card } from 'react-bootstrap'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { chunk } from 'lodash'

import BooksService from '../services/books'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onSaleBooks: undefined,
      recommendedBooks: undefined,
      popularBooks: undefined
    }
  }

  componentDidMount() {
    this.getOnSaleBooks()
    this.getRecommendedBooks()
    this.getPopularBooks()
  }

  getOnSaleBooks() {
    BooksService.getOnSaleBooks().then(
      (response) => {
        this.setState({
          onSaleBooks: response
        })
      }
    )
  }

  getRecommendedBooks() {
    BooksService.getRecommendedBooks().then(
      (response) => {
        this.setState({
          recommendedBooks: response
        })
      }
    )
  }

  getPopularBooks() {
    BooksService.getPopularBooks().then(
      (response) => {
        this.setState({
          popularBooks: response
        })
      }
    )
  }

  mapBooksSlide() {
    let books = chunk(this.state.onSaleBooks, 4)
    return books.map((chunks, index) => {
      return (
        <div class={`carousel-item ${index==0 ? "active" : ""}`} key={index}>
          <div class="row">
            {chunks.map((book, index) => {
              return (
                <div class="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div class="thumb-wrapper">
                    <div class="img-box">
                      <img src={`http://localhost/assets/bookcover/${book.book_cover_photo.match(/\d+$/)[0]>=1 && book.book_cover_photo.match(/\d+$/)[0]<=10 ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt=""></img>
                    </div>
                    <div class="thumb-content">
                      <p><b>{`${book.book_title}`}</b><br/><i>{`${book.author.author_name}`}</i></p>
                      <p class="item-price"><strike>{`$${book.book_price}`}</strike> <span>{`$${book.final_price}`}</span></p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }

  mapRecommendedBooks() {
    if (typeof(this.state.recommendedBooks) === 'undefined') {
      return <div>Loading...</div>;
    }
    let books = this.state.recommendedBooks
      return books.map((book, index) => {
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

  mapPopularBooks() {
    if (typeof(this.state.popularBooks) === 'undefined') {
      return <div>Loading...</div>;
    }
    let books = this.state.popularBooks
      return books.map((book, index) => {
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

  render() {
    return (
      <Container>
        <div class="d-flex justify-content-between">
          <h3>On Sale</h3>
          <Button variant="primary">View all</Button>{' '}
        </div>
        <div id="productCarousel" class="carousel slide" data-ride="carousel" data-interval="0">
          <div class="carousel-inner">
            {this.mapBooksSlide()}
          </div>
          <a class="carousel-control-prev" href="#productCarousel" data-slide="prev">
            <FontAwesomeIcon icon={faAngleLeft} />
          </a>
          <a class="carousel-control-next" href="#productCarousel" data-slide="next">
            <FontAwesomeIcon icon={faAngleRight} />
          </a>
        </div>

        <div class="d-flex justify-content-center">
          <h3>Featured Books</h3>
        </div>
        <ul class="nav nav-pills justify-content-center">
          <li class="nav-item">
            <a href="#recommended-tab" data-toggle="tab" class="nav-link active">Recommended</a>
          </li>
          <li class="nav-item">
            <a href="#popular-tab" data-toggle="tab" class="nav-link">Popular</a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active" id="recommended-tab">
            <div class="featured-books">
              <div class="book-item">
                <div class="row">
                  {this.mapRecommendedBooks()}
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" id="popular-tab">
            <div class="featured-books">
              <div class="book-item">
                <div class="row">
                  {this.mapPopularBooks()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default Home
