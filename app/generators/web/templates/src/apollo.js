import ApolloClient, { createNetworkInterface } from "apollo-client"
import gql from 'graphql-tag'
import { graphql as _graphql } from 'react-apollo'
import { get } from 'lodash'

const networkInterface = createNetworkInterface({
  uri: '/api/graphql'
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers)
      req.options.headers = {}
    if (localStorage.token)
      req.options.headers.Authorization = `Bearer ${localStorage.token}`
    next()
  }
}])

networkInterface.useAfter([{
  applyAfterware(res, next) {
    if (res.response.status === 401) {
      localStorage.removeItem('token')
      location.href = '/login'
    }
    next()
  }
}])

export const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return `${result.__typename}${result.id}`
    }
    return null
  }
})
