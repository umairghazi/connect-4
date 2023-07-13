export const typeDefs = `#graphql

type Message {
  _id: String
  userId: String
  message: String
  username: String
  picture: String
  create_date: String
}

type User {
  _id: String
  email: String
  firstName: String
  lastName: String
  displayName: String
  avatar: String
}

type SetUserStatusResult {
  success: Boolean
}

type RegisterUserResult {
  user: User
  token: String
}

type LoginUserResult {
  user: User
  token: String
}

type PostChatMessageResult {
  id: String
}

type Query {
  messages: [Message]
  getUser(token: String): User
}

type Mutation {
  loginUser(email: String, password: String): LoginUserResult
  postChatMessage(userId: String, message: String, username: String, picture: String): PostChatMessageResult
  registerUser(email: String, password: String, firstName: String, lastName: String, displayName: String, avatar: String): RegisterUserResult
  setUserStatus(email: String, isOnline: Boolean): SetUserStatusResult
}

type Subscription {
  message: Message
}
`;
