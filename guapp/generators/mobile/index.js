global.pd = console.log.bind(console)
const Generator = require('yeoman-generator')
const path = require('path')

module.exports = class extends Generator {
  constructor(args, opts) {
    const destinationRoot = process.cwd()
    super(args, opts)
    this.opts = Object.assign({}, this.config.getAll(), {
      subproject: path.basename(destinationRoot)
    })
    this.destinationRoot(destinationRoot)
  }

  writing() {
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.opts, {}, {globOptions: {dot: true}})
  }

  end() {
    const {username, project, gitUrl, subproject} = this.opts
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('git', ['remote', 'remove', 'origin'])
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `${gitUrl}:${username}/${project}-${subproject}.git`])
  }
}
