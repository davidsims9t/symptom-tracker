// import { userRepo } from "../../../users/repos";

export const resolvers = {
  Query: {
  },
  Mutation: {
    handleClerkWebhook: async (_: any, data: { data: string }, context: any) => {
      const webhook = JSON.parse(data.data);

      switch (webhook.type) {
        case "user.created":
          break;
        case "user.deleted":
          break;
        default:
          throw new Error(`Unknown webhook: ${webhook.type}`);
      }
    }
  }
};