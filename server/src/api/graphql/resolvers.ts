/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pubsub } from '../../index';
import { ChatController, UserController, GameController } from '../../controllers';
import { IContext } from '../../interface/IContext';

const chatController = new ChatController();
const userController = new UserController();
const gameController = new GameController();

export const resolvers = {
  Query: {
    // Auth
    getUser: (_: any, args: any) => userController.getUser(args),
    getActiveUsers: (_: any, args: any, context: IContext) =>
      userController.getActiveUsers(args, context),
    // Chat
    messages: (_: any, args: any) => chatController.getChatMessages(args),
    // Game
    getGame: (_: any, args: any) => gameController.getGame(args),
  },
  Mutation: {
    // Auth
    loginUser: (_: any, args: any) => userController.loginUser(args),
    registerUser: (_: any, args: any) => userController.registerUser(args),
    setUserStatus: (_: any, args: any) => userController.setUserStatus(args),
    // Chat
    postLobbyChatMessage: (_: any, args: any) => chatController.postChatMessage(args),
    // Game
    createGame: (_: any, args: any) => gameController.createGame(args),
    updateGame: (_: any, args: any) => gameController.updateGame(args),
  },
  Subscription: {
    message: {
      subscribe: () => {
        return pubsub?.asyncIterator(['MESSAGE']);
      },
    },
    newGame: {
      subscribe: () => {
        return pubsub?.asyncIterator(['NEW_GAME']);
      },
    },
  },
};
