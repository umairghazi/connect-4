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
  gameId: String
  player1Id: String
  player2Id: String
  player1Email: String
  player2Email: String
  status: String
  gameState: String
  playerTurn: String
  createDate: String
  updateDate: String
}


type Query {
  # Auth
  getUser(token: String, email: String, id: String): UserDTO
  getActiveUsers: [UserDTO]
  messages: [Message]
  getGame(gameId: String, email: String): Game
  checkChallenge(email: String): Game
}

type Mutation {
  # Auth
  loginUser(email: String, password: String): LoginUserResult
  registerUser(email: String, password: String, firstName: String, lastName: String, displayName: String, avatar: String): RegisterUserResult
  # Chat
  postLobbyChatMessage(userId: String, message: String): PostChatMessageResult
  postGameChatMessage(userId: String, message: String, username: String, picture: String): PostChatMessageResult
  # Game
  createGame(player1Email: String, player2Email: String, gameState: String): Game

  setUserStatus(email: String, isActive: Boolean): SetUserStatusResult
}

type Subscription {
  message: Message
  userActivity: UserActivity
  checkGame: Game
}
`;
