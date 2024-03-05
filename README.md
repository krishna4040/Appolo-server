# 🚀 Hello World GraphQL Server Setup

Welcome to the Hello World GraphQL Server setup! This guide will help you quickly set up a Node.js project with TypeScript, Express, Apollo Server, Prisma, PostgreSQL, CORS, and Nodemon.

## Prerequisites

Make sure you have the following installed on your machine:

- 📦 [Node.js](https://nodejs.org/)
- 📦 [npm](https://www.npmjs.com/)
- 🐘 [PostgreSQL](https://www.postgresql.org/)

## 🛠️ Setup

### Create a new Node.js project

```bash
mkdir my-graphql-server
cd my-graphql-server
mkdir src

npm init -y
npm i express apollo-server-express graphql prisma cors dotenv
npm i typescript prisma nodemon concurrently -D
npm i @types/node @types/express @types/cors -D

npx tsc --init
cd src && npx prisma init
```

### tsconfig file configurations

```bash
{
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"]
  }
}
```

### index.ts

```bash
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const httpServer = createServer(app)

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
})
await server.start()

app.use('/', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server))
httpServer.listen(process.env.PORT, () => console.log("GQL Server listening on port " + process.env.PORT))
```
### Dev Scripts

```bash
"dev": "concurrently -n \"ts,nodemon\" -c \"bgBlue,bgGreen\" \"tsc -w\" \"nodemon dist/index.js\""
```