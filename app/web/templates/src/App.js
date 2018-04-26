import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import BrowserRouter from 'gureact/BrowserRouter'
import PrivateRoute from 'gureact/PrivateRoute'
import WrapperRoute from 'gureact/WrapperRoute'
import GoogleAnalytics from 'gureact/GoogleAnalytics'
import ga from 'react-ga'
import { Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

import LoadAuth from './pages/LoadAuth'
import HomePage from './pages/Home/HomePage'
import LoginPage from './pages/Auth/LoginPage'
//import LoginOAuthTokenPage from './pages/Auth/LoginOAuthTokenPage'
import AppLayout from './pages/AppLayout'
import './App.css.js'

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
      <LoadAuth>
      <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <WrapperRoute wrapper={GoogleAnalytics}>
        <Switch>
          <Route path='/login' component={LoginPage} />
          {/*<Route path='/login-oauth-token' component={LoginOAuthTokenPage} />*/}
          <WrapperRoute wrapper={AppLayout}>
            <Route path='/' component={HomePage} exact />
          </WrapperRoute>
        </Switch>
      </WrapperRoute>
      </BrowserRouter>
      </ThemeProvider>
      </ApolloProvider>
      </LoadAuth>
    )
  }
}

export default App
