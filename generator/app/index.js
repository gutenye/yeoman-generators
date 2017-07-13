const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    const props = {}
    this.fs.copyTpl(`${this.templatePath()}/**/*`, this.destinationPath(), props, {}, {globOptions: {dot: true}})
  }
}
