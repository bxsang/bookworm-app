import React, { useState, useEffect } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import CheckBoxCard from './utils/CheckBoxCard'
import BookService from '../services/books'
import CategoryService from '../services/categories'
import AuthorService from '../services/authors'

const Shop = () => {
  const [books, setBooks] = useState(undefined)
  const [categories, setCategories] = useState(undefined)
  const [authors, setAuthors] = useState(undefined)
  const ratingStars = [1, 2, 3, 4, 5]
  const [checkedCategories, setCheckedCategories] = useState({})
  const [checkedAuthors, setCheckedAuthors] = useState({})
  const [checkedStars, setCheckedStars] = useState({1: true, 2: true, 3: true, 4: true, 5: true})

  useEffect(() => {
    CategoryService.getAll().then((response) => {
      setCategories(response)
      response.forEach(category => {
        setCheckedCategories(prevState => ({
          ...prevState,
          [category.id]: true
        }))
      })
    })

    AuthorService.getAll().then((response) => {
      setAuthors(response)
      response.forEach(author => {
        setCheckedAuthors(prevState => ({
          ...prevState,
          [author.id]: true
        }))
      })
    })
  }, [])

  let getFilteredBooks = () => {
    BookService.getFilteredBooks(checkedCategories, checkedAuthors, checkedStars, 'on-sale', 5)
      .then((response) => {
        setBooks(response)
      })
    console.log(books)
  }

  if (typeof(categories) === 'undefined' || typeof(authors) === 'undefined') {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h2>Books</h2>
      <hr />
      <div class="row shop mt-5">
        <div class="filter col-sm-2 col-md-2 col-lg-2">
          <p><strong>Filter by</strong></p>
          <CheckBoxCard
            title="Categories"
            items={categories}
            label="category_name"
            state={checkedCategories}
            setState={setCheckedCategories}
            getBooks={getFilteredBooks}
          />
          <CheckBoxCard
            title="Authors"
            items={authors}
            label="author_name"
            state={checkedAuthors}
            setState={setCheckedAuthors}
            getBooks={getFilteredBooks}
          />
          <CheckBoxCard
            title="Rating reviews"
            items={ratingStars}
            label="star"
            state={checkedStars}
            setState={setCheckedStars}
            getBooks={getFilteredBooks}
          />
          {/* <div class="card mb-2">
            <div class="card-body">
              <p><strong>Categories</strong></p>
              {categories.map((category, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={category.category_name}
                    checked={checkedCategories[category.id]}
                    key={index}
                    onChange={() => {
                      setCheckedCategories(prevState => ({
                        ...prevState,
                        [category.id]: !prevState[category.id]
                      }))
                      console.log(checkedCategories)
                    }}
                    >
                  </Form.Check>
                )
              })}
            </div>
          </div> */}
          {/* <div class="card mb-2">
            <div class="card-body">
              <p><strong>Authors</strong></p>
              {authors.map((author, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={author.author_name}
                    checked={checkedAuthors[author.id]}
                    key={index}
                    onChange={() => {
                      setCheckedAuthors(prevState => ({
                        ...prevState,
                        [author.id]: !prevState[author.id]
                      }))
                      console.log(checkedAuthors)
                    }}
                    >
                  </Form.Check>
                )
              })}
            </div>
          </div>
          <div class="card mb-2">
            <div class="card-body">
              <p><strong>Rating reviews</strong></p>
              {ratingStars.map((star, index) => {
                return (
                  <Form.Check
                    type="checkbox"
                    label={`${star} star`}
                    checked={checkedStars[star]}
                    key={index}
                    onChange={() => {
                      setCheckedStars(prevState => ({
                        ...prevState,
                        [star]: !prevState[star]
                      }))
                      console.log(checkedStars)
                    }}
                    >
                  </Form.Check>
                )
              })}
            </div>
          </div> */}
        </div>
        <div class="col-sm-10 col-md-10 col-lg-10">
          <h3>Hello</h3>
        </div>
      </div>
    </Container>
  )
}

export default Shop
