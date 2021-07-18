import Repository from './repository'

class OrderService {
  async addOrder(order) {
    const endpoint = '/orders'
    const response = await Repository.post(endpoint, order)
    if (response) {
      return response
    } else {
      throw new Error('Add order failed')
    }
  }
}

export default new OrderService()
