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
}

export default new BookService()
