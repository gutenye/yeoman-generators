const Generator = require('yeoman-generator')

global.pd = console.log.bind(console)

module.exports = class extends Generator {
  default() {
    this.composeWith(require.resolve('../init'))
    this.composeWith(require.resolve('../readmes'))
    this.composeWith(require.resolve('../jest'))
    this.composeWith(require.resolve('../eslint'))
  }

  writing() {
    this.props = this.config.getAll()

    this.fs.copyTpl(
      `${this.templatePath()}/**/*`,
      this.destinationPath(),
      this.props,
      {},
      { globOptions: { dot: true } }
    )
  }
}
