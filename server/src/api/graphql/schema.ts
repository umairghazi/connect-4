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
  id: String
}

type RegisterUserResult {
  id: String
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
  registerUser(email: String, password: String, firstName: String, lastName: String, displayName: String, avatar: String): RegisterUserResult
  loginUser(email: String, password: String): LoginUserResult
  setUserStatus(name: String, email: String): SetUserStatusResult
  postChatMessage(userId: String, message: String, username: String, picture: String): PostChatMessageResult
}

type Subscription {
  message: Message
}
`;
