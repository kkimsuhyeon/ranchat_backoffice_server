import { gql } from 'apollo-server-express'
import { IResolvers } from '@graphql-tools/utils'
import { getRepository } from 'typeorm'

import { User } from '../entities/User'

export const typeDef = gql`
    type User {
        userId: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        fullName: String
        bio: Bio
        loginSecret: String
        rooms: [Room]
        messages: [Message]
        createdAt: Date
        updatedAt: Date
    }

    extend type Query {
        users: [User]
        userByEmail(email: String!): [User]
    }

    extend type Mutation {
        createUser(email: String! password: String! firstName: String! lastName: String! bio:Bio):User
    }
`

export const resolvers: IResolvers = {

	User: {
		fullName: (parent: User) => `${parent.lastName} ${parent.firstName}`
	},

	Query: {
		users: async () => {

			const userRepo = getRepository(User);

			try {
				const result = await userRepo.createQueryBuilder("user").getMany();
				return result;
			} catch (e) {
				console.log(e);
				return null;
			}
		}
	},

	Mutation: {
		createUser: async (_: any, args: { email: string; password: string; firstName: string; lastName: string; bio: "W" | "M" }) => {

			const userRepo = getRepository(User);

			const { email, password, firstName, lastName, bio } = args;

			try {
				const newUser = new User();
				Object.assign(newUser, { email, password, firstName, lastName, bio });

				const result = await userRepo.save(newUser)

				if (result) return result;
				return null;

			} catch (e) {
				console.log(e);
				return null;
			}

		}
	}

}