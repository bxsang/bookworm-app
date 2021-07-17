import Repository from './repository'

class BookService {
  async getAllBooks() {
    const endpoint = '/books'
    const response = await Repository.get(endpoint)
    if (response) {
      return response
    } else {
      throw new Error('Get books failed')
    }
  }

  async getOnSaleBooks() {
    const endpoint = '/books/on-sale'
    const response = await Repository.get(endpoint)
    if (response.data) {
      return response.data
    } else {
      throw new Error('Get books failed')
    }
  }

  async getRecommendedBooks() {
    const endpoint = '/books/recommended'
    const response = await Repository.get(endpoint)
    if (response.data) {
      return response.data
    } else {
      throw new Error('Get books failed')
    }
  }

  async getPopularBooks() {
    const endpoint = '/books/popular'
    const response = await Repository.get(endpoint)
    if (response.data) {
      return response.data
    } else {
      throw new Error('Get books failed')
    }
  }

  async getOneBook(id) {
    const endpoint = `/books/${id}`
    const response = await Repository.get(endpoint)
    if (response.data) {
      return response.data
    } else {
      throw new Error('Get book failed')
    }
  }

  async getBookReviews(id) {
    const endpoint = `/books/${id}/reviews`
    const response = await Repository.get(endpoint)
    if (response.data) {
      return response.data
    } else {
      throw new Error('Get book reviews failed')
    }
  }

  async getFilteredBooks(
    categories,
    authors,
    ratingStars,
    sortBy,
    perPage,
    page
  ) {
    const formattedCategories = this.formatObj(categories)
    const formattedAuthors = this.formatObj(authors)
    const formattedStars = this.formatObj(ratingStars)

    const endpoint = `/books/filter?categories=${formattedCategories}&authors=${formattedAuthors}&rating_stars=${formattedStars}&sort_by=${sortBy}&per_page=${perPage}&page=${page}`
    const response = await Repository.get(endpoint)
    if (response) {
      return response
    } else {
      throw new Error('Get filtered books failed')
    }
  }

  formatObj(obj) {
    const result = []
    for (const item in obj) {
      if (obj[item]) {
        result.push(item)
      }
    }
    return result.join()
  }
}

export default new BookService()
