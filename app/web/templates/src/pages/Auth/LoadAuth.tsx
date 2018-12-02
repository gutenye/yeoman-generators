import React from 'react'
import gql from 'graphql-tag'
import { client } from '@/apollo'
import { auth } from '@/states'

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
