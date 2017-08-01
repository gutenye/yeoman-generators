require('pdjs')
require('yeoman-guten')
const Generator = require('yeoman-generator')
const { isEmpty } = require('lodash')

module.exports = class extends Generator {
  prompting() {
    if (isEmpty(this.config.getAll())) {
      this.composeWith(require.resolve('../init'))
    }
  }

  writing() {
    this.props = Object.assign(this.config.getAll(), {
      year: new Date().getFullYear(),
    })
    this.copyTemplate(this.props)
  }
}
