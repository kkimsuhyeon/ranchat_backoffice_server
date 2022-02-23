import './utils/passport';

import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import { PubSub } from 'graphql-subscriptions';
import passport from 'passport';

import dbConnection from './database';
import apolloConnection from './apollo';

dotenv.config();

const app = express();
const httpServer = createServer(app);

export const pubSub = new PubSub();

app.use(logger('dev'));
app.use(cors({ origin: '*', credentials: true }));

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (_error, user, _info) => {
    if (user) req.user = user;
    next();
  })(req, res, next);
});

dbConnection();
apolloConnection(app, httpServer);

export default httpServer;
