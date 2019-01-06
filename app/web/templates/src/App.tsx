import '@/vendor/developmentUtils'
import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import i18n from './i18n'
import routes from './config/routes.config'
import ga from 'react-ga'
import GlobalStyle from './App.css'
import formikSetLocale from 'gureact/formik/formikSetLocale'
import LoadAuth from './pages/Auth/LoadAuth'
import GoogleAnalyticsRoute from 'gureact/react-router/GoogleAnalyticsRoute'
// import BrowserRouter from 'gureact/react-router/BrowserRouter'
import RouteWithConfig from 'gureact/react-router/RouteWithConfig'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'
import { I18nextProvider } from 'react-i18next'

ga.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID!)
formikSetLocale('zh-CN')

class App extends React.Component {
  static childContextTypes = {
    reactIconBase: PropTypes.object,
  }

  getChildContext() {
    return {
      reactIconBase: {
        size: 32,
        className: 'icon',
      },
    }
  }

  render() {
    return (
      <>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <LoadAuth>
                <BrowserRouter>
                  <GoogleAnalyticsRoute>
                    <RouteWithConfig routes={routes} />
                  </GoogleAnalyticsRoute>
                </BrowserRouter>
              </LoadAuth>
            </I18nextProvider>
          </ThemeProvider>
        </ApolloProvider>
      </>
    )
  }
}

export default App
