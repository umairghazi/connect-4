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
    getUser: (_: any, args: any) => userController.getUser(args),
    messages: (_: any, args: any) => chatController.getChatMessages(args),
    getGame: (_: any, args: any) => gameController.getGame(args),
    getActiveUsers: (_: any, args: any, context: IContext) =>
      userController.getActiveUsers(args, context),
    checkChallenge: (_: any, args: any) => gameController.checkChallenge(args),
  },
  Mutation: {
    // Auth
    loginUser: (_: any, args: any) => userController.loginUser(args),
    registerUser: (_: any, args: any) => userController.registerUser(args),
    // Chat
    postLobbyChatMessage: (_: any, args: any) => chatController.postChatMessage(args),
    // Game
    createGame: (_: any, args: any) => gameController.createGame(args),
    setUserStatus: (_: any, args: any) => userController.setUserStatus(args),
  },
  Subscription: {
    message: {
      subscribe: () => {
        return pubsub?.asyncIterator(['MESSAGE']);
      },
    },
    checkGame: {
      subscribe: () => {
        return pubsub?.asyncIterator(['CHALLENGE']);
      },
    },
    // userActivity: {
    //   subscribe: () => {
    //     return pubsub?.asyncIterator(['USER_ACTIVITY']);
    //   },
    // },
  },
};
