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
    this.props = this.config.getAll()
    this.copyTemplate(this.props)
  }

  install() {
    this.yarnInstall(['react-styleguidist', 'react-frame-component'], { dev: true })
  }
}
