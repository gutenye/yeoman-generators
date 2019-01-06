import { merge } from 'lodash'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'
import Basic from './Basic/BasicResolvers'
import User from './User/UserResolvers'

const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'))
export const typeDefs = mergeTypes(typesArray, { all: true })

export const resolvers = merge({}, Basic, User)
