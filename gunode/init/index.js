const Generator = require('yeoman-generator')
const { upperFirst, camelCase } = require('lodash')

module.exports = class extends Generator {
  initializing() {
    this.props = this.config.getAll()
  }

  async prompting() {
    const result = await this.prompt([
      {
        name: 'username',
        message: 'Username: e.g. gutenwork',
        validate: v => (v ? true : 'required'),
        when: !this.props.username,
        type: 'input',
      },
      {
        name: 'project',
        message: 'Project: e.g. hello-world',
        validate: v => (v ? true : 'required'),
        when: !this.props.project,
        type: 'input',
      },
      {
        name: 'author',
        message: 'Author: e.g. Guten Ye',
        validate: v => (v ? true : 'required'),
        when: !this.props.author,
        type: 'input',
      },
    ])

    this.props = Object.assign(this.props, result)
    this.props = Object.assign(this.props, {
      Project: upperFirst(camelCase(this.props.project)),
    })
    this.config.set(this.props)
  }
}
