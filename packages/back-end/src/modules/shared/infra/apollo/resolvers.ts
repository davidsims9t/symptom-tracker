// import { userRepo } from "../../../users/repos";

export const resolvers = {
  Query: {
  },
  Mutation: {
    saveUserFromClerk: async (_: any, data: { data: string }, context: any) => {
      const json = JSON.parse(data.data);
      return {
        id: 1,
        email: "test",
        username: "test"
      };
    }
  }
};