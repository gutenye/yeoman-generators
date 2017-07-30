import '../src/models'
import sequelize from '../src/vendor/sequelize'
import bcrypt from 'bcrypt'
import inquirer from 'inquirer'

global.pd = console.log.bind(console)

function password(text) {
  return bcrypt.hashSync(text, 10)
}

const getFixtures = props => ({
  user: [{ username: 'admin', password: password(props.password) }],
})

async function main() {
  const answers = await inquirer.prompt([
    {
      name: 'password',
      message: 'admin password:',
      type: 'password',
      validate: v => (v ? true : 'required'),
    },
  ])

  const FIXTURES = getFixtures(answers)

  await sequelize.sync()

  await Object.keys(FIXTURES).reduce(
    (p, key) =>
      p.then(() => {
        console.log(`>> Load ${key}`)
        return sequelize.models[key].bulkCreate(FIXTURES[key])
      }),
    Promise.resolve()
  )

  process.quit()
}

main()
