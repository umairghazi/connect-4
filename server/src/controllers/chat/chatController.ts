import { pubsub } from '../../index';
import { MongoConection } from '../../infrastructure';
import { ChatRepo } from '../../repositories';
import { ChatService } from '../../services';

interface IPostMessageParams {
  userId: string;
  message: string;
  gameId: string;
}

interface IResolver<TArgs> {
  args: TArgs;
}

interface IChatController {
  postChatMessage: ({ args }: IResolver<IPostMessageParams>) => Promise<any>;
}

const mongoConection = MongoConection.default.db;
const chatRepo = new ChatRepo(mongoConection);
const chatService = new ChatService(chatRepo);

export class ChatController implements IChatController {
  public async postChatMessage({ args }: IResolver<IPostMessageParams>): Promise<any> {
    const { userId, message, gameId } = args;
    const result = await chatService.postChatMessage({
      userId,
      message,
      gameId,
    });
    // pubsub?.publish('MESSAGE', { messages: msg });
    return result;
  }
}
