import { observer, graphql, compose } from 'vendor'
import HomeComponent from './HomeComponent'

const QueryHome = graphql(`{
  users {
    name
  }
}`, {
  initData: {users: []},
})

export default compose(
  observer,
  //QueryHome,
)(HomeComponent)
