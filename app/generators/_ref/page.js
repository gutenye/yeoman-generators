// Icon: icons/home.svg, import { IconHome, MdCheck } from 'icons', <IconHome /> <MdCheck size={14} color style>

import React, { styled, graphql, gql, observer, compose, _ } from 'vendor'
import queryString from 'query-string'

@observer
class Hello extends React.Component {
  render() {
    if (this.props.loading)
      return null
    const {posts} = this.props
    return (
      <Root>
        {posts}
      </Root>
    )
  }

  onSearch = (q) => {
    const {name} = this.props
    const {value} = this.state
    this.props.onSearch(q)       //  don't omit this.props for external methods. so it's props.onSearch not this.onSearch

    history.push({query: {q}})
    history.push({query: {page}, keep: true})
  }
}

const Root = styled.div`
  color: red;
`

const postFragment = gql`
  fragment postFragment on Post {
    id
    title
  }
`

const QueryHome = graphql(gql`query Home($page: Int) {
  posts(page: $page) {
    totalCount
    nodes {
      ...postFragment
    }
  }
  categories: config(id: "Product.Categories")   // without __type, can not cache.
}
  ${postFragment}
`, {
  initVariables: {page: undefined}, // apllo is merge variables with old one.
  initData: {posts: {nodes: []}},   // so that you can render ui when data is loading
})

const MutationCreatePage = graphql(gql`query CreatePost($input: CreatePostInput) {
  createPost(input: $input) {
    id
    title
  }
}`, {
  updateQueries: ..
})

export default compose(
  QueryHome,
  MutationCreatePost,
)(Hello)
