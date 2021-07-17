import Repository from './repository'

class AuthorService {
  async getAll() {
    const endpoint = '/authors'
    const response = await Repository.get(endpoint)
    if (response) {
      return response
    } else {
      throw new Error('Get authors failed')
    }
  }
}

export default new AuthorService()
