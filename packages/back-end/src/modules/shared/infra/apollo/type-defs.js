"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "\n  type User {\n    id: ID!\n    username: String!\n    email: String!\n  }\n  \n  type Query {\n    user: [User]\n  }\n  \n  type Mutation {\n    saveUserFromClerk(\n      data: String\n    ): User\n  }\n";
