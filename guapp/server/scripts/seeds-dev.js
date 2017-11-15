import '../src/models'
import sequelize from '../src/vendor/sequelize'
import {
  gen,
  user,
} from 'shared/fixtures'
import 'gudatagen/lib/helpers/password'

global.pd = console.log.bind(console)

const FIXTURES = gen({
  user: gen(user, 1),
})

async function main() {
  await sequelize.sync({ force: true })

  await Object.keys(FIXTURES).reduce(
    (p, key) =>
      p.then(() => {
        console.log(`>> Load ${key}`)
        return sequelize.models[key].bulkCreate(FIXTURES[key])
      }),
    Promise.resolve()
  )

  // reset all id_seq
  await sequelize.query(`
    CREATE OR REPLACE FUNCTION "reset_sequence" (tablename text, columnname text, sequence_name text) RETURNS "pg_catalog"."void" AS $$  
    BEGIN 
      EXECUTE 'SELECT setval( ''' || quote_ident(sequence_name)  || ''', ' || '(SELECT MAX(' || columnname || ') FROM '  || quote_ident(tablename) || ')' || '+1)';
    END;  
    $$ LANGUAGE plpgsql;
    select table_name || '_' || column_name || '_seq', reset_sequence(table_name, column_name, table_name || '_' || column_name || '_seq') from information_schema.columns where column_default like 'nextval%';
  `)

  process.exit()
}

main()
