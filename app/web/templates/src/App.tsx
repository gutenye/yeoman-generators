import '@/vendor/developmentUtils'
import React from 'react'
import PropTypes from 'prop-types'
import theme from './theme'
import i18n from './i18n'
import routes from './routes'
import ga from 'react-ga'
import GlobalStyle from './App.css'
import formikSetLocale from 'gureact/formik/formikSetLocale'
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
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <div>
              <GlobalStyle />
              {routes}
            </div>
          </I18nextProvider>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
