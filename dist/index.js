import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const httpServer = createServer(app);
const server = new ApolloServer({
    typeDefs: `#graphql
    type Query {
      hello: String
    }
  `,
    resolvers: {
        Query: {
            hello: () => 'Hello from Apollo Server!!'
        }
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/graphql', cors(), express.json(), expressMiddleware(server));
httpServer.listen(process.env.PORT, () => console.log("GQL Server listening on port " + process.env.PORT));
