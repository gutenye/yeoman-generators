const { upperFirst, camelCase } = require('lodash')

/**
 * this.props = await setupProps.call(this)
 */
exports.setupProps = async function setupProps() {
  this.props = this.config.getAll()

  const result = await this.prompt([
    {
      name: 'username',
      message: 'Username: (e.g. gutenye, gutenwork)',
      validate: v => (v ? true : 'required'),
      when: !this.props.username,
      type: 'input',
    },
    {
      name: 'project',
      message: 'Project: (e.g. hello-world)',
      validate: v => (v ? true : 'required'),
      when: !this.props.project,
      type: 'input',
    },
    {
      name: 'author',
      message: 'Author: (e.g. Guten Ye)',
      validate: v => (v ? true : 'required'),
      when: !this.props.author,
      type: 'input',
    },
    {
      name: 'gitUrl',
      message: 'Git URL:',
      default: 'git@git.guten.me',
      validte: v => (v ? true : 'required'),
      when: !this.props.gitUrl,
      type: 'input',
    }
  ])

  this.props = Object.assign(this.props, result)
  this.props = Object.assign(this.props, {
    Project: upperFirst(camelCase(this.props.project)),
  })

  this.config.set(this.props)
  return this.props
}