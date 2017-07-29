const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    this.fs.append(
      this.destinationPath('ake'),
      '\n' + this.fs.read(this.templatePath('ake'))
    )
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      this.fs.readJSON(this.templatePath('package.json'))
    )
  }

  install() {
    this.yarnInstall(['jest', 'babel-jest', 'jest-transforms'], { dev: true })
  }
}
