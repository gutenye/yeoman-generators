import { graphql, gql, compose } from 'vendor'
import HomeComponent from './HomeComponent'

const QueryHome = graphql(gql`query Home {
  users {
    name
  }
}`, {
  //initVariables: {q: undefined}, // reset variable when called again.
  //initData: {users: []}, // give array initial value 
})

export default compose(
  //QueryHome,
)(HomeComponent)
