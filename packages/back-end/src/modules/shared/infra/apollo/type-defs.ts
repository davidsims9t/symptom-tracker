export default `
  type User {
    id: ID!
    username: String!
    email: String!
    age: Int
    phoneNumber: String
    dob: String!
    name: String!
    legalName: String
    mrn: Int
    test: [Test]
    pcp: Provider
    sub: String
  }
  
  type Result {
    id: ID!
    component: String!
    value: String!
    unit: String!
    standardRange: String
    flag: String
  }
  
  type Test {
    name: String!
    lab: Lab
    result: [Result]
    pcp: Provider!
    orderedBy: Provider!
    id: ID!
    collectedOn: String!
    resultOn: String!
    resultStatus: String!
    AggregateTestResult: AggregateTestResult!
  }

  type AggregateTestResult {
    name: String!
    id: ID!
    test: [Test]
  }
  
  type Provider {
    name: String
    id: ID!
  }
  
  type Lab {
    name: String!
    id: ID!
  }

  input ResultInput {
    id: Int
    component: String!
    value: String!
    unit: String!
    standardRange: String!
    testId: Int!
    flag: String
  }
  
  type Query {
    user: [User]
    lab(id: ID): [Lab]
    test(id: ID): [Test]
    result: [Result]
    provider(id: ID): [Provider]
    aggregateTestResult(id: ID): [AggregateTestResult]
  }
  
  type Mutation {
    upsertUser(
      id: Int,
      username: String!,
      email: String!, 
      age: Int, 
      phoneNumber: String,
      dob: String!,
      name: String!,
      legalName: String,
      mrn: Int,
      pcp: Int,
      sub: String!
    ): User
    upsertTest(
      id: Int,
      name: String!,
      labId: Int!,
      providerId: Int!,
      collectedOn: String!,
      resultOn: String!,
      resultStatus: String,
      aggregateTestResultId: Int!,
    ): Test
    upsertPdf(buffer: String): Test
    upsertLab(id: Int, name: String!): Lab
    upsertAggregateTestResult(id: Int, name: String!): AggregateTestResult
    upsertProvider(id: Int, name: String!): Provider
    upsertResult(input: [ResultInput]): [Result]
    deleteLab(id: Int): Lab
    deleteAggregateTestResult(id: Int): AggregateTestResult
    deleteTest(id: Int): Test
    deleteResult(id: Int): Result
    deleteProvider(id: Int): Provider
    deleteUser(id: Int): User
  }
`;