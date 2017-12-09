//import 'normalize.css'
import './App.css.js'
import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import PrivateRoute from 'gureact/lib/PrivateRoute'
import BrowserRouter from 'gureact/lib/polyfill/patch-react-router'
import GoogleAnalytics from 'react-ga'
import withTracker from 'gureact/lib/withTracker'
import { Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

import LoadAuth from './pages/LoadAuth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
//import LoginOAuthTokenPage from './pages/Auth/LoginOAuthTokenPage'
import AppLayout from './pages/AppLayout'
import TestPage from './pages/TestPage'

GoogleAnalytics.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID)

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
      <LoadAuth>
      <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Route component={withTracker(() => (
        <Switch>
          <Route path='/test' component={TestPage} />
          <Route path='/login' component={LoginPage} />
          {/*<Route path='/login-oauth-token' component={LoginOAuthTokenPage} />*/}
          <PrivateRoute component={() => <AppLayout>
            <Route path='/' component={HomePage} exact />
          </AppLayout>} />
        </Switch>
      ))} />
      </BrowserRouter>
      </ThemeProvider>
      </ApolloProvider>
      </LoadAuth>
    )
  }
}

export default App
