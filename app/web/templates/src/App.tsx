import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import routes from './routes'
import ga from 'react-ga'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

ga.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)

class App extends React.Component {
  static childContextTypes = {
    reactIconBase: PropTypes.object
  }

  getChildContext() {
    return {
      reactIconBase: {
        size: 32,
        className: 'icon',
      }
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          {routes}
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
