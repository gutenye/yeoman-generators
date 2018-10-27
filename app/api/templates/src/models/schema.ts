import { merge } from 'lodash'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import * as path from 'path'
import Basic from './Basic/BasicResolvers'

const typesArray = fileLoader(path.join(__dirname, '**/*.graphql'))
export const typeDefs = mergeTypes(typesArray, { all: true })

export const resolvers = merge({}, Basic)
