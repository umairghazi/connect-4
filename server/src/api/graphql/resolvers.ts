/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pubsub } from '../../index';
import { ChatController, UserController } from '../../controllers';
import { IContext } from '../../interface/IContext';
import { GameController } from '../../controllers/game/gameController';

const chatController = new ChatController();
const userController = new UserController();
const gameController = new GameController();

export const resolvers = {
  Query: {
    getUser: (_: any, args: any) => userController.getUser(args),
    messages: (_: any, args: any) => chatController.getChatMessages(args),
    getChallenge: (_: any, args: any) => gameController.getChallenge(args),
    getActiveUsers: (_: any, args: any, context: IContext) =>
      userController.getActiveUsers(args, context),
  },
  Mutation: {
    loginUser: (_: any, args: any) => userController.loginUser(args),
    postChatMessage: (_: any, args: any) => chatController.postChatMessage(args),
    registerUser: (_: any, args: any) => userController.registerUser(args),
    setUserStatus: (_: any, args: any) => userController.setUserStatus(args),
    createChallenge: (_: any, args: any) => gameController.createChallenge(args),
  },
  Subscription: {
    message: {
      subscribe: () => {
        return pubsub?.asyncIterator(['MESSAGE']);
      },
    },
    checkChallenge: {
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
