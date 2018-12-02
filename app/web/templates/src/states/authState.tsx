import { observable } from 'mobx'

class AuthState {
  @observable user: any = null

  isLoggedIn = () => {
    return !!this.user
  }

  load = ({ err, data }) => {
    if (err || !data.loadAuth.user) {
      this.logout()
    } else {
      this.user = data.loadAuth.user
    }
  }

  login = ({ err, data }) => {
    if (err) {
      return
    }
    localStorage.setItem('token', data.login.token)
    this.user = data.login.user
  }

  logout = () => {
    localStorage.removeItem('token')
    this.user = null
  }
}

export default new AuthState()
