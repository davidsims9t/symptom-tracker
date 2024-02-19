export default `
  type User {
    id: ID!
    username: String!
    email: String!
  }
  
  type Query {
    user: [User]
  }
  
  type Mutation {
    handleClerkWebhook(
      data: String
    ): User
  }
`;