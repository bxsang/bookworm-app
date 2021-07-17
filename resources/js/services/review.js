import Repository from './repository'

class ReviewService {
  async addReview(review) {
    const endpoint = '/reviews'
    const response = await Repository.post(endpoint, review)
    if (response.id) {
      return response
    } else {
      throw new Error('Add review failed')
    }
  }
}

export default new ReviewService()
