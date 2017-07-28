import gql from 'graphql-tag'
import { graphql as _graphql } from 'react-apollo'
import { get } from 'lodash'

// graphql wrapper
//
//   const App = graphql(`{         // omit gql``
//     products {
//       id
//     }
//   }`, {
//    initVariables: {page: undefined}   // must define all variables
//    initData: {products: []},     // default data when loading
//    // use params and location.query as variables
//    // props is data
//   })(App)
export function graphql(query, opts) {
  opts = {initData: {}, initVairables: {}, ...opts}
  return _graphql(gql`${query}`, {
    options: (props) => {
      const params = get(props, 'match.params', {})
      const query = get(props, 'location.query', {})
      return {variables: {...opts.initVariables, ...params, ...query}}
    },
    props: ({data}) => ({...opts.initData, ...data}),
    ...opts
  })
}
