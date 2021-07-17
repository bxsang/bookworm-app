const API_URL = 'http://localhost/api'

function getToken() {
  try {
    return JSON.parse(localStorage.getItem('user')).access_token
  } catch (error) {
    return ''
  }
}

class Repository {
  constructor() {
    this.token = ''
  }

  async get(endpoint) {
    this.token = getToken()
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
    return response.json()
  }

  async post(endpoint, data) {
    this.token = getToken()
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async put(endpoint, data) {
    this.token = getToken()
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }

  async delete(endpoint, data) {
    this.token = getToken()
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(data),
    })
    return response.json()
  }
}

export default new Repository()
