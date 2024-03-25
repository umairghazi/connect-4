import { ObjectId } from 'mongodb';
import { pubsub } from '../../index';
import { MongoConection } from '../../infrastructure';
import { ChatRepo } from '../../repositories';

interface PostMessageParams {
  userId: string;
  message: string;
  picture: string;
  username: string;
}

export interface GetMessageParams {
  userId: string;
  username: string;
  startTime: string;
  endTime: string;
}

const mongoConection = MongoConection.default.db;
const chatRepo = new ChatRepo(mongoConection);

interface IChatController {
  getChatMessages: (params: GetMessageParams) => Promise<any>;
  postChatMessage: (params: PostMessageParams) => Promise<any>;
}

export class ChatController implements IChatController {
  public async getChatMessages(params: GetMessageParams): Promise<any> {
    const { userId, startTime, endTime } = params || {};

    const result = await chatRepo.getChatMessages({
      userId,
      startTime,
      endTime,
    });

    return result;
  }

  public async postChatMessage(params: PostMessageParams): Promise<{ id: ObjectId | null }> {
    const { userId, message, username } = params || {};

    const messageObj = {
      userId,
      message,
      username,
    };

    const result = await chatRepo.postChatMessage(messageObj);

    pubsub?.publish('MESSAGE', { message: messageObj });

    return result;
  }
}
