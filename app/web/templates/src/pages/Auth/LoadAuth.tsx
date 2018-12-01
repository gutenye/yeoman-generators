import React, { client, gql } from 'vendor'
import { auth } from '@/state'

const QueryLoadAuth = gql`
  query LoadAuth {
    loadAuth {
      user {
        id
        username
      }
    }
  }
`

class LoadAuth extends React.Component {
  state = {
    loaded: false,
  }

  render() {
    if (!this.state.loaded) {
      return null
    } else {
      return this.props.children
    }
  }

  async componentWillMount() {
    const res = (await client.query({ query: QueryLoadAuth }).catch(err => ({ err }))) as any
    auth.load(res)
    this.setState({ loaded: true })
  }
}

export default LoadAuth
