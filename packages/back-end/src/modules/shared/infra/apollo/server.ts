import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import jwtDecode from 'jwt-decode';
import { resolvers } from "./resolvers.js";
import typeDefs from './type-defs.js';
import { PrismaClient } from '@prisma/client';
import clerkClient from '@clerk/clerk-sdk-node';

export const prisma = new PrismaClient();

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

        const user = await prisma.user.findFirst({
            where: {
                sub: jwt.sub
            }
        });

        return { user };
    },
});

console.log(`🚀  Server ready at: ${url}`);