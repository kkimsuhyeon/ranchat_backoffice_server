import { gql } from 'apollo-server-express'
import { IResolvers } from '@graphql-tools/utils'
// import { getRepository } from 'typeorm'

export const typeDef = gql`
    type Message {
        id: Int!
        text: String
        user: User
        room: Room
        createdAt: Date
    }
`

export const resolvers: IResolvers = {}