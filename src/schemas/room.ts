import { gql } from 'apollo-server-express'
import { IResolvers } from '@graphql-tools/utils'
import { getRepository } from 'typeorm'

export const typeDef = gql`
    type Room{
        id: Int!
        users: [User]
        messages: [Message]
        createdAt: Date
        updatedAt: Date
    }
`

export const resolvers: IResolvers = {}