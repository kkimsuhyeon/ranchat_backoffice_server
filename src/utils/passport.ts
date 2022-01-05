import passport from 'passport'
import { getRepository } from 'typeorm'
import { Strategy, ExtractJwt, StrategyOptions, VerifyCallback } from 'passport-jwt'

import { Manager } from '../entities/Manager'

const jwtOptions: StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromHeader("authorization"),
	secretOrKey: "secret"
}

const verifyManager: VerifyCallback = async (payload, done) => {


	try {
		const managerRepo = getRepository(Manager)
		const manager = await managerRepo.createQueryBuilder("manager")
			.where("manager.managerId = :managerId", { managerId: payload.id })
			.getOne()

		if (manager !== null) return done(null, manager)
		return done(null, false);

	} catch (e) {
		return done(e, false)
	}
}

passport.use(new Strategy(jwtOptions, verifyManager))