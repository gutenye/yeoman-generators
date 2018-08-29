require('pdjs')
require('yeoman-guten')
const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  default() {
    this.composeWith(require.resolve('../shared.init'))
    this.composeWith(require.resolve('../shared.readmes'))
    this.composeWith(require.resolve('../shared.typescript'))
  }

  writing() {
    this.props = this.config.getAll()
    this.copyTemplate(this.props)
  }
}
