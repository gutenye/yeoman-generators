global.pd = console.log.bind(console)
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
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.opts, {}, {globOptions: {dot: true}})
    fs.symlinkSync('../docs', 'docs')
    fs.symlinkSync('../shared', 'shared')
  }

  install() {
    this.spawnCommandSync('ncu', ['-u'])
    this.yarnInstall()
  }

  end() {
    const {username, project, gitUrl, subproject} = this.opts
    this.spawnCommandSync('flow-typed', ['install'])
    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('git', ['remote', 'remove', 'origin'])
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `${gitUrl}:${username}/${project}-${subproject}.git`])
  }
}
