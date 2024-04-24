import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';

dotenv.config();

import { resolvers } from './api/graphql/resolvers';
import { typeDefs } from './api/graphql/schema';

interface ApolloContext {
  token?: string;
}

interface JwtData {
  userId: string;
  email: string;
}

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/api',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<ApolloContext>({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    {
      // async requestDidStart(context) {
      // const query = context.request.query?.replace(/\s+/g, ' ').trim();
      // const variables = JSON.stringify(context.request.variables, null, 2);
      // console.log(new Date().toISOString(), '- [Request Started]');
      // console.log(query);
      // console.log(variables);
      // console.log(context.request.operationName);
      // console.log('-------------------');
      // return;
      // },
    },
  ],
});

async function startServer() {
  await server.start();

  app.use(
    '/api',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers?.authorization?.split(' ')?.[1] || '';

        const jwtData = jwt.decode(token);

        const { userId, email } = (jwtData as JwtData) || {};
        return { token, email, userId };
      },
    }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await httpServer.listen({ port: 4000 });

  console.log(`🚀 Server ready at http://localhost:4000/api`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:4000/api`);
}

export const pubsub = new PubSub();

startServer();
