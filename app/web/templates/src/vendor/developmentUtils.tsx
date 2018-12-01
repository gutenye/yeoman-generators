import gql from 'graphql-tag'
import * as mobx from 'mobx'
import * as state from '@/states'
import { client } from '../apollo'

if (process.env.NODE_ENV === 'development') {
  window.client = client
  window.gql = gql
  window.state = state
  window.mobx = mobx
}

// (product), (products)
function recursiveConvert(value: any): any {
  if (Array.isArray(value)) {
    return value.map(v => recursiveConvert(v))
  } else if (mobx.isObservableObject(value)) {
    return mobx.toJS(value)
  } else {
    return value
  }
}

// pd(product), pd(products)
window.pdMobx = (...args: any[]) => {
  console.log(...recursiveConvert(args))
}
