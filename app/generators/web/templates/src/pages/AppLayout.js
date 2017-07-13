import React, { withRouter, observer, styled } from 'vendor'
import DevTools from 'mobx-react-devtools'

@withRouter
@observer
class AppLayout extends React.Component {
  render() {
    var {props: {children}} = this
    return (
      <Root>
        <DevTools />
        {children}
      </Root>
    )
  }
}

const Root = styled.div`
`

export default AppLayout
