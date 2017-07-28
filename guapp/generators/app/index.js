global.pd = console.log.bind(console)
const Generator = require('yeoman-generator')

const DEFAULT_OPTIONS = {
  gitUrl: 'git@git.guten.me'
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    // for shell scripts
    this.option('project', { type: String })
    this.option('username', { type: String })
  }

  async prompting() {
    let result = {}
    if (this.options.project) {
      result = {
        project: this.options.project,
        username: this.options.username
      }
    } else {
      result = await this.prompt([
        {type: 'input', name: 'project', message: 'project (e.g. notes):', validate: v => v ? true : 'required'},
        {type: 'input', name: 'username', message: 'username (e.g. gutenye, gutenwork):', validate: v => v ? true : 'required'},
      ])
    }
    this.opts = Object.assign(DEFAULT_OPTIONS, result)
  }

  writing() {
    this.fs.copyTpl(`${this.templatePath()}/**`, this.destinationPath(), this.opts, {}, {globOptions: {dot: true}})
  }

  end() {
    const {username, project, gitUrl} = this.opts
    this.config.set(this.opts)
    this.spawnCommandSync('git', ['init'], {cwd: this.destinationPath('')})
    this.spawnCommandSync('git', ['remote', 'remove', 'origin'])
    this.spawnCommandSync('git', ['remote', 'add', 'origin', `${gitUrl}:${username}/${project}${suffix}.git`], {cwd: this.destinationPath('')})
  }
}
