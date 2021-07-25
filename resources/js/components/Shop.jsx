/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Container, Dropdown, Row, Col, Accordion } from 'react-bootstrap'
import BookCards from './utils/BookCards'
import CheckBoxCard from './utils/CheckBoxCard'
import MyPagination from './utils/MyPagination'
import BookService from '../services/books'
import CategoryService from '../services/categories'
import AuthorService from '../services/authors'

const Shop = () => {
  const [books, setBooks] = useState(undefined)
  const [categories, setCategories] = useState(undefined)
  const [authors, setAuthors] = useState(undefined)
  const ratingStars = [1, 2, 3, 4, 5, 'all']
  const sortBy = {
    'on-sale': 'On sale',
    popularity: 'Popularity',
    price_asc: 'Price low to high',
    price_desc: 'Price high to low',
  }
  const perPageList = [5, 10, 15, 20, 25]
  const [currentSort, setCurrentSort] = useState('on-sale')
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const [checkedCategories, setCheckedCategories] = useState({})
  const [checkedAuthors, setCheckedAuthors] = useState({})
  const [checkedStars, setCheckedStars] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    all: true,
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldComponentUpdate, setShouldComponentUpdate] = useState(false)

  useEffect(() => {
    ;(async () => {
      await Promise.all([
        CategoryService.getAll().then((response) => {
          setCategories(response)
          response.forEach((category) => {
            setCheckedCategories((prevState) => ({
              ...prevState,
              [category.id]: true,
            }))
          })
        }),

        AuthorService.getAll().then((response) => {
          setAuthors(response)
          response.forEach((author) => {
            setCheckedAuthors((prevState) => ({
              ...prevState,
              [author.id]: true,
            }))
          })
        }),
      ])

      setShouldComponentUpdate(true)
    })()
  }, [])

  useEffect(() => {
    if (
      shouldComponentUpdate &&
      typeof categories !== 'undefined' &&
      typeof authors !== 'undefined'
    ) {
      getFilteredBooks()
      setShouldComponentUpdate(false)
    }
  }, [shouldComponentUpdate])

  const getFilteredBooks = () => {
    BookService.getFilteredBooks(
      checkedCategories,
      checkedAuthors,
      checkedStars,
      currentSort,
      currentPerPage,
      currentPage
    ).then((response) => {
      setBooks(response)
    })
  }

  const mapBooks = () => {
    if (typeof books === 'undefined') {
      return <div>Loading...</div>
    }

    return <BookCards books={books.data} />
  }

  if (
    typeof categories === 'undefined' ||
    typeof authors === 'undefined' ||
    typeof books === 'undefined'
  ) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h2>Books</h2>
      <hr />
      <Row className="mt-5">
        <div className="filter col-sm-2 col-md-2 col-lg-2">
          <p>
            <strong>Filter by</strong>
          </p>
          <Accordion id="bookFilterAccordion">
            <CheckBoxCard
              title="Categories"
              items={categories}
              label="category_name"
              state={checkedCategories}
              setState={setCheckedCategories}
              getBooks={() => {
                setShouldComponentUpdate(true)
              }}
            />
            <CheckBoxCard
              title="Authors"
              items={authors}
              label="author_name"
              state={checkedAuthors}
              setState={setCheckedAuthors}
              getBooks={() => {
                setShouldComponentUpdate(true)
              }}
            />
            <CheckBoxCard
              title="Rating reviews"
              items={ratingStars}
              label="star"
              state={checkedStars}
              setState={setCheckedStars}
              getBooks={() => {
                setShouldComponentUpdate(true)
              }}
            />
          </Accordion>
        </div>
        <Col sm={10} md={10} lg={10}>
          <div className="d-flex justify-content-between mb-4">
            <p>
              Showing {books.meta.from}-{books.meta.to} of {books.meta.total}{' '}
              books
            </p>
            <div>
              <Dropdown className="d-inline mx-2">
                <Dropdown.Toggle variant="secondary">
                  {`Sort by ${sortBy[currentSort]}`}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(sortBy).map((item, index) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          setCurrentSort(item)
                          setShouldComponentUpdate(true)
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
                          setShouldComponentUpdate(true)
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
          <div className="book-item">
            <Row>{mapBooks()}</Row>
          </div>
          <MyPagination
            totPages={books.meta.last_page}
            currentPage={currentPage}
            pageClicked={(page) => {
              setCurrentPage(page)
              setShouldComponentUpdate(true)
            }}
          ></MyPagination>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop
