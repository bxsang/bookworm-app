import Repository from "./repository"

class BookService {
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
}

export default new BookService()
