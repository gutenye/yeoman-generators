const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  writing() {
    const props = {
      project: 'b',
      username: 'a',
      year: new Date().getFullYear(),
      author: 'Guten Ye',
    }
    this.fs.copyTpl(`${this.templatePath()}/**/*`, this.destinationPath(), props, {}, {globOptions: {dot: true}})
  }
}
