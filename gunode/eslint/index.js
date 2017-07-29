const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  install() {
    this.yarnInstall(['eslint-config-guten'], { dev: true })
  }
}
