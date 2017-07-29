const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  initialize() {
    this.props = Object.assign(this.config.getAll(), {
      year: new Date().getFullYear(),
    })
  }

  writing() {
    this.fs.copyTpl(
      `${this.templatePath()}/**/*`,
      this.destinationPath(),
      this.props,
      {},
      { globOptions: { dot: true } }
    )
  }
}
