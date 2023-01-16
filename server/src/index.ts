import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { WebSocketServer } from 'ws';
import { expressJwtSecret } from 'jwks-rsa';
import { expressMiddleware } from '@apollo/server/express4';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Algorithm } from 'jsonwebtoken';

dotenv.config();

import { resolvers } from './api/graphql/resolvers';
import { typeDefs } from './api/graphql/schema';

interface MyContext {
  token?: string;
}

const app = express();

const httpServer = http.createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/api',
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer<MyContext>({
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
  ],
});

const checkJwt = expressjwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKS_URI || '',
  }) as GetVerificationKey,
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: [process.env.JWT_ALGORITHM as Algorithm],
});

async function startServer() {
  await server.start();
  app.use(checkJwt);
  app.use(
    '/api',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        token: req.headers.token,
      }),
    }),
  );

  await httpServer.listen({ port: 4000 });
  console.log(`🚀 Server ready at http://localhost:4000/api`);
  console.log(`🚀 Subscription endpoint ready at ws://localhost:4000/api`);
}
export const pubsub = new PubSub();
startServer();
