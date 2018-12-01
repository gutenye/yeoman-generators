export { RouteComponentProps } from 'react-router-dom'
// export { InjectedTranslateProps } from 'react-i18next'
import * as ReactApollo from 'react-apollo'
export type QueryResult = ReactApollo.QueryResult
// export { Props as AppHomeComponentProps } from 'components/AppHomeComponent'

export type ID = string

export interface Conn<Node> {
  nodes: Node[]
  hasNextPage?: boolean
  pages?: number
}

export interface Order {
  [key: string]: any
}

export interface Sale {
  [key: string]: any
}

export interface Product {
  id: ID
  name: string
}

export interface ProductOption {
  name: string
  values: string[]
}

export interface Variant {
  id: ID
  option0: string
  option1: string
  defaultPrice: number
}

export interface OrderItem {
  variant: Variant
  product: Product
  productId: ID
  qty: number
  price: number
}

export interface Inventory {
  id: ID
  name: string
}

export interface Stock {
  id: ID
  qty: number
  inventoryId: ID
  variantId: ID
  productId: ID
}
