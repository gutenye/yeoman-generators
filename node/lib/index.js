require('pdjs')
require('yeoman-guten')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  default() {
    this.composeWith(require.resolve('../init'))
    this.composeWith(require.resolve('../readmes'))
  }

  writing() {
    this.props = this.config.getAll()
    this.copyTemplate(this.props)
  }
}
