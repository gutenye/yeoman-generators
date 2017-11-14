import { ApolloClient } from "apollo-client"
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = createHttpLink({ uri: '/api/graphql' })

const authLink = setContext((_, { headers}) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    } 
  }
})

const logoutLink = onError(({ networkError }) => {
  if (networkError === 401) {
    localStorage.removeItem('token')
    location.href = '/login'
  }
})

const link = ApolloLink.from([authLink, logoutLink, httpLink])

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return `${result.__typename}${result.id}`
    }
    return null
  }
})