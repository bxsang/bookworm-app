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
      onSaleBook: undefined
    }
  }

  componentDidMount() {
    this.getOnSaleBooks()
  }

  getOnSaleBooks() {
    BooksService.getOnSaleBooks().then(
      (response) => {
        this.setState({
          onSaleBook: response
        })
      }
    )
  }

  mapBooksSlide() {
    let books = chunk(this.state.onSaleBook, 4)
    return books.map((chunks, index) => {
      return (
        <div class={`carousel-item ${index==0 ? "active" : ""}`} key={index}>
          <div class="row">
            {chunks.map((book, index) => {
              return (
                <div class="col-lg-3 col-md-4 col-sm-6" key={index}>
                  <div class="thumb-wrapper">
                    <div class="img-box">
                      <img src={`http://localhost/assets/bookcover/${book.book_cover_photo.match(/\d+$/)[0] ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt=""></img>
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

  render() {
    return (
      <Container>
        <Row>
          <div class="col-md-12">
            <div class="section">
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
          </div>
        </Row>
      </Container>
    )
  }
}

export default Home
