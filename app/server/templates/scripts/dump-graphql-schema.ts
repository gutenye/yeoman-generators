import { typeDefs } from '../src/models/schema'
import * as fs from 'fs'

const argv = process.argv.slice(2)
fs.writeFileSync(argv[0], typeDefs)
process.exit(0)
