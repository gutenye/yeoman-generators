require('pdjs')
const Generator = require('yeoman-generator')
const { setupProps } = require('../utils')

module.exports = class extends Generator {
  async initializing() {
    this.props = await setupProps.call(this)
  }

  writing() {
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.props, {}, {globOptions: {dot: true}})
  }

  end() {
    const {username, project, gitUrl} = this.props
    this.spawnCommandSync('git', ['init'], {cwd: this.destinationPath('')})
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `${gitUrl}:${username}/${project}.git`], {cwd: this.destinationPath('')})
  }
}
