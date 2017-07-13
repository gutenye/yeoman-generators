import React from 'vendor'
import { auth } from 'states'

class LoadAuth extends React.Component {
  state = {
    loaded: false
  }

  render() {
    if (!this.state.loaded)
      return null
    else
      return this.props.children
  }

  async componentWillMount() {
    await auth.load()
    this.setState({loaded: true})
  }
}

export default LoadAuth
