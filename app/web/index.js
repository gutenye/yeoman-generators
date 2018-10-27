require('pdjs')
const fs = require('fs')
const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    // .yo-rc.json is in parent directory, destinationRoot is auto changed, so we need change it back.
    const cwd = process.cwd()
    super(args, opts)
    this.props = Object.assign({}, this.config.getAll(), {
      subproject: path.basename(cwd)
    })
    this.destinationRoot(cwd)
  }

  writing() {
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.props, {}, {globOptions: {dot: true}})
    try {
      fs.symlinkSync('../shared', 'shared')
      fs.symlinkSync('/Users/guten/dev/one/gureact/src', 'gureact')
    } catch (e) {
      // catch EEXIST
    }
  }

  install() {
    this.spawnCommandSync('ncu', ['-u'])
    this.yarnInstall()
  }
}
