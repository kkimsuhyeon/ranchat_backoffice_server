import { gql } from 'apollo-server-express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { IResolvers } from '@graphql-tools/utils'
import { merge } from 'lodash'

import * as demo from './demo'
import * as user from './user'
import * as room from './room'
import * as message from './message'
import * as manager from './manager'

const typeDef = gql`
    enum Bio {
        M
        W
    }

    scalar JSON
    scalar Date

    type Query {
        _version: String
    }

    type Mutation {
        _empty: String
    }

    type Subscription {
        _empty: String
    }
`

const resolvers: IResolvers = {
    Query: { _version: () => "1.0" },
    Mutation: {},
    Subscription: {}
}

const schema = makeExecutableSchema({
    typeDefs: [typeDef, demo.typeDef, user.typeDef, room.typeDef, message.typeDef, manager.typeDef],
    resolvers: merge(resolvers, demo.resolvers, user.resolvers, room.resolvers, message.resolvers, manager.resolvers)
})

export default schema