const path = require('path')

module.exports = {
  title: '<%=project%> docs',
  styleguideDir: 'build.docs',
  template: './src/styleguide/template.html',
  require: ['./src/styleguide/styleguide.js', './src/styleguide/styleguide.css'],
  serverPort: 4010,

  // prettier-ignore
  sections: [
    //{ name: 'Getting Started', content: 'docs/README.md' },
    //{ name: 'Buttons', sections: [
    // { name: 'Buttons', content: 'src/Button/README.md',  components: 'src/Button/[A-Z]*.js' },
  ],

  // remove default README.md
  getExampleFilename(componentPath) {
    return componentPath.replace(/\.js$/, '.md')
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

  /*
  webpackConfig: require('@gutenye/react-scripts/config/webpack.config.dev')
  webpackConfig: {
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/ },
      ],
    }
  },
  */
}
