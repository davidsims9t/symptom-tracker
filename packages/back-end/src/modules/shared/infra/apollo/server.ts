import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { jwtDecode } from 'jwt-decode';
import { resolvers } from "./resolvers.js";
import typeDefs from './type-defs.js';
import clerkClient from '@clerk/clerk-sdk-node';
import express from "express";

// const app = express();

// app.post('/graphql', (req, res) => {
//     console.log(req.body);
//     return res.status(200);
// });

// app.listen(4000, () => console.log('running'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        if (!req.headers?.authorization) return { };

        // @ts-ignore
        const jwt = jwtDecode(req.headers?.authorization?.replace('Bearer ', '')) as {sub: string};

        const clerkUser = await clerkClient.users.getUser(jwt.sub);

        // const user = await prisma.user.findFirst({
        //     where: {
        //         sub: jwt.sub
        //     }
        // });

        const user = {};

        return { user };
    },
});

console.log(`🚀  Server ready at: ${url}`);