export const typeDefs = `#graphql

type Message {
  id: String
  userId: String
  messageText: String
  timestamp: String
}

type Query {
  getMessages: [Message]
}

type CreateUserResult {
  id: String
}

type PostChatMessageResult {
  id: String
}

type Mutation {
  createUser(name: String, email: String): CreateUserResult
  postChatMessage(userId: String, message: String, gameId: String): PostChatMessageResult
}

# type Subscription {
#   messages: Message
# }
`;
