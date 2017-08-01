require('pdjs')
const Generator = require('yeoman-generator')
const { isEmpty } = require('lodash')

module.exports = class extends Generator {
  prompting() {
    if (isEmpty(this.config.getAll())) {
      this.composeWith(require.resolve('../init'))
    }
  }

  install() {
    this.yarnInstall(['eslint-config-guten'], { dev: true })
  }
}
