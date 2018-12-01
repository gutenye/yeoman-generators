import React, { client, update } from 'vendor'
import { app } from '@/state'
import {
  allCustomersGql,
  customerChangeGql,
  allProductsGql,
  productChangeGql,
  allInventoriesGql,
  inventoryChangeGql,
  productAllOptionsGql,
} from 'query'

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
