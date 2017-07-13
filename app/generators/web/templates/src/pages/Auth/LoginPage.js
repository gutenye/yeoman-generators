import React, { observer, styled } from 'vendor'
import { auth } from 'states'

@observer
class LoginPage extends React.Component {
  render() {
    if (auth.isLoggedIn())
      return <div>Loggedin</div>
    return (
      <Root>
        <a href='/auth/github'>Login with Github</a>
      </Root>
    )
  }
}

const Root = styled.div`
  & .input {
    width: 100%;
  }
`

export default LoginPage
