import React, { Component, useState, useEffect } from 'react'
import { Container, Row, Button, Card, Form } from 'react-bootstrap'
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BooksService from '../services/books'
import { useParams } from 'react-router-dom'

function getBook(bookId) {
  return BooksService.getOneBook(bookId)
}

const BookDetail = () => {
  let { id } = useParams();
  const [book, setBook] = useState(undefined)
  const [buyQuantity, setBuyQuantity] = useState(1)

  useEffect(() => {
    getBook(id).then((response) => {
      setBook(response)
    })
  }, [])

  let increaseBuyQuantity = () => {
    setBuyQuantity(buyQuantity + 1)
  }

  let decreaseBuyQuantity = () => {
    if (buyQuantity > 1) {
      setBuyQuantity(buyQuantity - 1)
    }
  }

  if (typeof(book) === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h2>{book.category.category_name}</h2>
      <hr />
      <div class="row book-detail">
        <div class="col-sm-8 col-md-8 col-lg-8">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row">
                <div class="col-sm-3 col-md-3 col-lg-3">
                  <img src={`http://localhost/assets/bookcover/${book.book_cover_photo!==null && book.book_cover_photo.match(/\d+$/)[0]>=1 && book.book_cover_photo.match(/\d+$/)[0]<=10 ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt="" />
                  <p class="d-flex justify-content-end">
                    <i>By &nbsp;</i><b>{`${book.author.author_name}`}</b>
                  </p>
                </div>
                <div class="col-sm-9 col-md-9 col-lg-9">
                  <h3><b>{book.book_title}</b></h3>
                  <p>{book.book_summary}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">
              <h3>Customer reviews</h3>
            </div>
            <div class="card-body">
              <h4><b>{book.avg_star}&nbsp;Star</b></h4>
            </div>
          </div>
        </div>
        <div class="col-sm-4 col-md-4 col-lg-4">
          <div class="card mb-4">
            <div class="card-header">
              <h3>
                {book.book_price !== book.final_price ? (
                  <strike>{`$${book.book_price}`}</strike>
                ): null}
                <span><strong>{`$${book.final_price}`}</strong></span>
              </h3>
            </div>
            <div class="card-body">
              <form class="add-cart">
                <p>Quantity</p>
                <span class="number">
                  <a class="btn" onClick={decreaseBuyQuantity}><FontAwesomeIcon icon={faMinus} /></a>
                  <input id="buy-quantity" type="text" name="buy-quantity" value={buyQuantity} />
                  <a class="btn" onClick={increaseBuyQuantity}><FontAwesomeIcon icon={faPlus} /></a>
                </span>
                <Button variant="secondary" className="mt-3">Add to cart</Button>
              </form>
            </div>
          </div>
          <div class="card mb-4">
            <div class="card-header">
              <h3>Write a review</h3>
            </div>
            <div class="card-body">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add a title</Form.Label>
                  <Form.Control type="text" placeholder="" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Detaill please! Your review helps other shoppers.</Form.Label>
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

// class BookDetail extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       book: undefined,
//       buyQuantity: 1
//     }

//     this.handleBuyQuantityFormChange = this.handleBuyQuantityFormChange.bind(this)
//   }

//   componentDidMount() {
//     this.getBook()
//   }

//   getBook() {
//     BooksService.getOneBook(this.props.match.params.id).then(
//       (response) => {
//         this.setState({
//           book: response
//         })
//       }
//     )
//   }

//   increaseBuyQuantity = () => {
//     this.setState({
//       buyQuantity: this.state.buyQuantity + 1
//     })
//   }

//   decreaseBuyQuantity = () => {
//     if (this.state.buyQuantity > 1) {
//       this.setState({
//         buyQuantity: this.state.buyQuantity - 1
//       })
//     }
//   }

//   handleBuyQuantityFormChange(event) {
//     this.setState({buyQuantity: parseInt(event.target.value)})
//   }

//   render() {
//     if (!this.props.match.params.id) {
//       return <div>No book specified</div>
//     }

//     if (typeof(this.state.book) === 'undefined') {
//       return <div>Loading...</div>
//     }
//     const book = this.state.book

//     return (
//       <Container>
//         <h2>{book.category.category_name}</h2>
//         <hr />
//         <div class="row book-detail">
//           <div class="col-sm-8 col-md-8 col-lg-8">
//             <div class="card mb-4">
//               <div class="card-body">
//                 <div class="row">
//                   <div class="col-sm-3 col-md-3 col-lg-3">
//                     <img src={`http://localhost/assets/bookcover/${book.book_cover_photo!==null && book.book_cover_photo.match(/\d+$/)[0]>=1 && book.book_cover_photo.match(/\d+$/)[0]<=10 ? book.book_cover_photo : 'default'}.jpg`} class="img-fluid" alt="" />
//                     <p class="d-flex justify-content-end">
//                       <i>By &nbsp;</i><b>{`${book.author.author_name}`}</b>
//                     </p>
//                   </div>
//                   <div class="col-sm-9 col-md-9 col-lg-9">
//                     <h3><b>{book.book_title}</b></h3>
//                     <p>{book.book_summary}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div class="card mb-4">
//               <div class="card-header">
//                 <h3>Customer reviews</h3>
//               </div>
//               <div class="card-body">
//                 <h4><b>{book.avg_star}&nbsp;Star</b></h4>
//               </div>
//             </div>
//           </div>
//           <div class="col-sm-4 col-md-4 col-lg-4">
//             <div class="card mb-4">
//               <div class="card-header">
//                 <h3>
//                   {book.book_price !== book.final_price ? (
//                     <strike>{`$${book.book_price}`}</strike>
//                   ): null}
//                   <span><strong>{`$${book.final_price}`}</strong></span>
//                 </h3>
//               </div>
//               <div class="card-body">
//                 <form class="add-cart">
//                   <p>Quantity</p>
//                   <span class="number">
//                     <a class="btn" onClick={this.decreaseBuyQuantity}><FontAwesomeIcon icon={faMinus} /></a>
//                     <input id="buy-quantity" type="text" name="buy-quantity" value={this.state.buyQuantity} />
//                     <a class="btn" onClick={this.increaseBuyQuantity}><FontAwesomeIcon icon={faPlus} /></a>
//                   </span>
//                   <Button variant="secondary" className="mt-3">Add to cart</Button>
//                 </form>
//               </div>
//             </div>
//             <div class="card mb-4">
//               <div class="card-header">
//                 <h3>Write a review</h3>
//               </div>
//               <div class="card-body">
//                 <Form>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label>Add a title</Form.Label>
//                     <Form.Control type="text" placeholder="" />
//                   </Form.Group>
//                   <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                     <Form.Label>Detaill please! Your review helps other shoppers.</Form.Label>
//                     <Form.Control as="textarea" rows={3} />
//                   </Form.Group>
//                   <Form.Group className="mb-3">
//                     <Form.Label>Add a title</Form.Label>
//                     <Form.Control as="select">
//                       <option value="1">1 star</option>
//                       <option value="2">2 star</option>
//                       <option value="3">3 star</option>
//                       <option value="4">4 star</option>
//                       <option value="5">5 star</option>
//                     </Form.Control>
//                   </Form.Group>
//                   <Button variant="secondary" type="submit">
//                     Submit Review
//                   </Button>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//     )
//   }
// }

export default BookDetail
