import { gql } from 'apollo-server-express'
import { IResolvers } from '@graphql-tools/utils'
import { getRepository } from 'typeorm'

import { encodeToken } from '../utils/generate'
import { tokenAuthenticator } from '../utils/authenticator'

import { Manager } from '../entities/Manager'



export const typeDef = gql`
    type Manager {
        managerId: String!
        id: String!
        password: String!
        name: String!
        loginSecret: String
        createdAt: Date
        updatedAt: Date
    }

    extend type Query{
        managers: [Manager]
    }

    extend type Mutation{
        createManager(id: String! password: String! name: String!):Manager
        requestLoginManager(id: String! password: String!): String
    }
`

export const resolvers: IResolvers = {

	Query: {
		managers: async (_: any, __: any, { req }) => {
			tokenAuthenticator(req);

			const managerRepo = getRepository(Manager)

			try {
				const result = await managerRepo.createQueryBuilder("manager").getMany()
				return result;
			} catch (e) {
				console.log(e);
				return null;
			}

		}
	},

	Mutation: {
		createManager: async (_: any, args: { id: string; password: string; name: string }) => {

			const managerRepo = getRepository(Manager)

			const { id, password, name } = args;

			try {
				const newManager = new Manager();
				Object.assign(newManager, { id, password, name })

				const result = await managerRepo.save(newManager)

				if (result) return result;
				return null;

			} catch (e) {
				console.log(e);
				return null;
			}
		},

		requestLoginManager: async (_: any, args: { id: string; password: string }) => {

			const managerRepo = getRepository(Manager);

			const { password, id } = args

			try {
				const manager = await managerRepo.createQueryBuilder("manager")
					.where("manager.id = :id", { id: id })
					.andWhere("manager.password = :password", { password: password })
					.getOne()

				if (manager) return encodeToken(manager.managerId)

				// add Error Code
				return null;

			} catch (e) {
				console.log(e)
				return null;
			}
		}
	}

}