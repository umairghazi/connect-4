export const typeDefs = `#graphql

type Message {
  _id: String
  _userId: String
  message: String
  create_date: String
}

type CreateUserResult {
  id: String
}

type PostChatMessageResult {
  id: String
}

type Query {
  getChatMessages: [Message]
}

type Mutation {
  createUser(name: String, email: String): CreateUserResult
  postChatMessage(userId: String, message: String, gameId: String): PostChatMessageResult
}

type Subscription {
  message: Message
}
`;
