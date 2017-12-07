require('gudatagen/lib/helpers/password')
const {
  gen,
  user,
} = require('shared/fixtures')

module.exports = gen({
  user: gen(user, 1),
})
