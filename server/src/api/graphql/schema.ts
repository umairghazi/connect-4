export const typeDefs = `#graphql

type Message {
  id: String
  userId: String
  message: String
  timestamp: String
  createDate: String
  updateDate: String
  user: UserDTO
}

type UserDTO {
  id: String
  email: String
  firstName: String
  lastName: String
  displayName: String
  avatar: String
  createDate: String
  updateDate: String
  isActive: Boolean
}

type SetUserStatusResult {
  success: Boolean
}

type RegisterUserResult {
  user: UserDTO
  token: String
}

type LoginUserResult {
  user: UserDTO
  token: String
}

type PostChatMessageResult {
  id: String
}

type UserActivity {
  email: String
  isActive: Boolean
}

type Game {
  id: String
  player1Id: String
  player2Id: String
  gameStatus: String
  whoseTurn: String
  createDate: String
  updateDate: String
  player1Data: UserDTO
  player2Data: UserDTO
  boardData: String
  winnerId: String
}


type Query {
  # Auth
  getUser(token: String, email: String, id: String): UserDTO
  getActiveUsers: [UserDTO]
  messages: [Message]
  # Game
  getGame(player1Id: String, player2Id: String, id: String): [Game]
}

type Mutation {
  # Auth
  loginUser(email: String, password: String): LoginUserResult
  registerUser(email: String, password: String, firstName: String, lastName: String, displayName: String, avatar: String): RegisterUserResult
  setUserStatus(email: String, isActive: Boolean): SetUserStatusResult
  # Chat
  postLobbyChatMessage(userId: String, message: String): PostChatMessageResult
  postGameChatMessage(userId: String, message: String, username: String, picture: String): PostChatMessageResult
  # Game
  createGame(player1Id: String, player2Id: String): Game
  updateGame(id: String, player1Id: String, player2Id: String, gameStatus: String, whoseTurn: String, boardData: String): Game

}

type Subscription {
  message: Message
  newGame: Game
}
`;
