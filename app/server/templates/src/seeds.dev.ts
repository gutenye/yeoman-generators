require('gudatagen/lib/helpers/password')
const { gen } = require('./fixtures')

const data = gen.run({
  mode: 'server',
})
// console.log(data.order)
module.exports = data
