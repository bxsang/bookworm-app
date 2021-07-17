import Repository from './repository'

class CategoryService {
  async getAll() {
    const endpoint = '/categories'
    const response = await Repository.get(endpoint)
    if (response) {
      return response
    } else {
      throw new Error('Get categories failed')
    }
  }
}

export default new CategoryService()
