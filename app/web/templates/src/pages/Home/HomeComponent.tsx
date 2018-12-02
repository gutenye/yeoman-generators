import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

@observer
class HomeComponent extends React.Component {
  render() {
    return <Root>HOME</Root>
  }
}

const Root = styled.div``

export default HomeComponent
