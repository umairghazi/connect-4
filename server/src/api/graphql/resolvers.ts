/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pubsub } from '../../index';
import { ChatController, UserController } from '../../controllers';

const chatController = new ChatController();
const userController = new UserController();

export const resolvers = {
  Query: {
    messages: (_: any, args: any) => chatController.getChatMessages(args),
    getUser: (_: any, args: any) => userController.getUser(args),
  },
  Mutation: {
    loginUser: (_: any, args: any) => userController.loginUser(args),
    registerUser: (_: any, args: any) => userController.registerUser(args),
    setUserStatus: (_: any, args: any) => userController.setUserStatus(args),
    postChatMessage: (_: any, args: any) => chatController.postChatMessage(args),
  },
  Subscription: {
    message: {
      subscribe: () => {
        return pubsub?.asyncIterator(['MESSAGE']);
      },
    },
  },
};
