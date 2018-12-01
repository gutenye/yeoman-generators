const path = require('path')
const typescriptParser = require('react-docgen-typescript')

module.exports = {
  title: '<%=project%> docs',
  styleguideDir: 'build.docs',
  template: './src/docs/template.html',
  require: ['./src/docs/docs.js', './src/docs/docs.css'],
  serverPort: 4010,
  propsParser: typescriptParser.withDefaultConfig().parse,

  // prettier-ignore
  sections: [
    //{ name: 'OrderTable', content: 'src/components/OrderTable/README.md', components: 'src/components/OrderTable/OrderTable.js' },
    // { name: 'ActionsBar', content: 'src/gureact2/antd-mobile/ActionsBar/README.md', components: 'src/gureact2/antd-mobile/ActionsBar/[A-Z]*.tsx' },
  ],

  // remove default README.md
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.(js|tsx)$/, '.md')
  },

  styles: {
    ComponentsList: {
      heading: {
        '& + ul > $isChild': {
          display: 'none',
        }
      },
    },
  },

  webpackConfig: require('./config-overrides')(require('react-scripts/config/webpack.config.dev'), 'development')
}
