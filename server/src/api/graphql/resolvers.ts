/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { pubsub } from '../../index';
import { ChatController, UserController } from '../../controllers';

const chatController = new ChatController();
const userController = new UserController();

export const resolvers = {
  // Query: {
  //   getMessages: chatController.getMessages,
  // },
  Mutation: {
    createUser: (_root: any, args: any, context: any, info: any) =>
      userController.createUser({ args }),
    postChatMessage: (_root: any, args: any, context: any, info: any) =>
      chatController.postChatMessage({ args }),
  },
  // Subscription: {
  //   messages: {
  //     subscribe: () => {
  //       return pubsub?.asyncIterator(['MESSAGE']);
  //     },
  //   },
  // },
};
