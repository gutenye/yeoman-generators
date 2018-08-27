const default = require('./jest.config.js')

module.exports = Object.assign(require('./jest.config.js', {
  "testMatch": [ "**/__tests__/**/*.e2e-test.ts" ],
}
