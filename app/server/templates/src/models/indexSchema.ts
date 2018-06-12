import Schema from 'guserver-schema-mini'
import Basic from './BasicSchema'
import User from './UserSchema'

const schema = new Schema([Basic, User])

//pd(schema.buildSchemaText())

export default schema
