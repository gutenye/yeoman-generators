import 'pdjs'
import fs from 'fs'
import AdminSchema from '../src/admin/schema'
import StoreSchema from '../src/store/schema'

fs.writeFileSync('./build.docs/admin.graphql', AdminSchema.buildSchemaText())
fs.writeFileSync('./build.docs/store.graphql', StoreSchema.buildSchemaText())
