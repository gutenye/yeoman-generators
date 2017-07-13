import React, { withRouter } from 'vendor'
import { auth } from 'states'

@withRouter
class LoginOAuthTokenPage extends React.Component {
  render() {
    return null
  }

  async componentWillMount() {
    const {router, location} = this.props
    auth.saveToken(location.query.token)
    router.push('/')
  }
}

export default LoginOAuthTokenPage
