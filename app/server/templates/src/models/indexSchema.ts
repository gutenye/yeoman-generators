import Schema from 'guserver-schema-mini'
import Basic from './BasicSchema'
import User from './UserSchema'

const schema = new Schema([Basic, User])

export default schema
