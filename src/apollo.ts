import { ApolloServer, ExpressContext } from 'apollo-server-express';
import { Application } from 'express';
import { Server } from 'http';
import { ConnectionParams, SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

import schema from './schemas/schema';

const apolloConnection = async (app: Application, server: Server) => {
  const subscriptionServer = SubscriptionServer.create(
    {
      schema: schema,
      execute: execute,
      subscribe: subscribe,
      onConnect: async (connectionParams: ConnectionParams) => {
        console.log(connectionParams);
      },
    },
    { server: server, path: '/graphql' }
  );

  const apolloServer = new ApolloServer({
    schema: schema,
    context: ({ req, res }: ExpressContext) => {
      if (req) return { req, res };
      return undefined;
    },
    plugins: [
      process.env.NODE_ENV === 'production' ? ApolloServerPluginLandingPageDisabled() : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app, cors: false });
};

export default apolloConnection;
