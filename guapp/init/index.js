require('pdjs')
const Generator = require('yeoman-generator')
const { setupProps } = require('../utils')

module.exports = class extends Generator {
  async initializing() {
    this.props = await setupProps.call(this)
  }
}
