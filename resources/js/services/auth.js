import Repository from "./repository"

class AuthService {
  async login (credentials) {
    const endpoint = '/login'
    const response = await Repository.post(endpoint, credentials)
    if (response.user && response.access_token) {
      localStorage.setItem('user', JSON.stringify(response))
    } else {
      throw new Error('Login failed')
    }
    return response
  }

  async register (info) {
    const endpoint = '/register'
    const response = await Repository.post(endpoint, info)
    if (response.id) {
      return response
    } else {
      throw new Error('Register failed')
    }
  }

  logout () {
    localStorage.removeItem('user')
  }

}

export default new AuthService()
