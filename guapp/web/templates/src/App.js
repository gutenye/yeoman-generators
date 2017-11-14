import 'normalize.css'
import './App.css'
import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import { history } from './vendor/patch-react-router'
import { Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from 'components/PrivateRoute'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

import LoadAuth from './pages/LoadAuth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
import LoginOAuthTokenPage from './pages/Auth/LoginOAuthTokenPage'
import AppLayout from './pages/AppLayout'
import TestPage from './pages/TestPage'

export default class App extends React.Component {
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
      <Router history={history}>
        <Switch>
          <Route path='/test' component={TestPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/login-oauth-token' component={LoginOAuthTokenPage} />
          <PrivateRoute component={() => <AppLayout>
            <Route path='/' component={HomePage} exact />
          </AppLayout>} />
        </Switch>
      </Router>
      </ThemeProvider>
      </ApolloProvider>
      </LoadAuth>
    )
  }
}
