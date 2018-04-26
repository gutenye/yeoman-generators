import { api } from 'vendor'
import { observable } from 'mobx'

class AuthState {
  @observable user = null
  @observable error = null

  isLoggedIn = () => {
    return !! this.user
  }

  load = () => {
    if (localStorage.token) {
      api.headers['Authorization'] = `Bearer ${localStorage.token}`
      return api.get('/load-auth').then(res => {
        if (res.err)
          this.logout()
        else
          this.user = res.body.user
        return res
      })
    } else {
      return Promise.resolve()
    }
  }

  // loginWithPassword
  login = (body) => {
    return api.post('/login', {body}).then(res => {
      if (!res.err) {
        this.user = res.body.user
        this.saveToken(res.body.token)
      }
      return res
    })
  }

  // loginWithToken
  saveToken = (token) => {
    localStorage.token = token
    api.headers['Authorizaton'] = `Bearer ${token}`
  }

  logout = () => {
    localStorage.removeItem('token')
    this.user = null
    api.headers['Authorizaton'] = null
    return Promise.resolve()
  }
}

export default new AuthState()
