const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    this.copyTemplate()
  }
}
