import '../src/models'
import sequelize from '../src/vendor/sequelize'
import shell from 'shelljs'

global.pd = console.log.bind(console)

async function main() {
  // create new table
  await sequelize.sync()

  // run other changes
  shell.exec('sequelize db:migrate')

  process.exit()
}

main()
