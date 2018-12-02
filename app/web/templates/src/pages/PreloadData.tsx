import React from 'react'
// import { app } from '@/states'
// import { allCustomersGql } from '@/query'

export default class PreloadData extends React.Component<any> {
  state = {
    loading: true,
  }

  render() {
    if (this.state.loading) {
      return null
    }
    return this.props.children
  }

  async componentDidMount() {
    await this.preloadData()
    this.setState({ loading: false })
  }

  async preloadData() {
    // preload data
  }
}
