roptsequire('pdjs')
require('yeoman-guten')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  default() {
    this.composeWith(require.resolve('../init'))
    this.composeWith(require.resolve('../readmes'))
    this.composeWith(require.resolve('../jest'))
    this.composeWith(require.resolve('../eslint'))
  }

  writing() {
    this.props = this.config.getAll()
    this.copyTemplate(this.props)
  }
}
