import { gql } from 'apollo-server-express'
import { IResolvers } from '@graphql-tools/utils'
import { getRepository } from 'typeorm'

export const typeDef = gql`
    extend type Query {
        hello: String!
    }
`

export const resolvers: IResolvers = {

    Query: {
        hello: () => { return 'hello' }
    }

}