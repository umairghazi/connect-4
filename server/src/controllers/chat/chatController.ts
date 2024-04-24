import { pubsub } from '../../index';
import { CreateResult, MongoConection } from '../../infrastructure';
import { IChatDTO, mapChatEntityToDTO } from '../../interface';
import { ChatRepo, PostChatMessageRepoOptions } from '../../repositories';

interface PostMessageParams {
  userId: string;
  message: string;
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
  getChatMessages: (params: GetMessageParams) => Promise<IChatDTO[]>;
  postChatMessage: (params: PostMessageParams) => Promise<CreateResult>;
}

export class ChatController implements IChatController {
  public async getChatMessages(params: GetMessageParams): Promise<IChatDTO[]> {
    const { userId, startTime, endTime } = params ?? {};

    const result = await chatRepo.getChatMessages({
      userId,
      startTime,
      endTime,
    });

    const messagesDTO = result.map(mapChatEntityToDTO);

    return messagesDTO;
  }

  public async postChatMessage(params: PostMessageParams): Promise<CreateResult> {
    const { userId, message } = params ?? {};

    const messageObj: PostChatMessageRepoOptions = {
      userId,
      message,
    };

    const result = await chatRepo.postChatMessage(messageObj);

    const messageData = await chatRepo.getChatMessages({ _id: result.id });

    const messageDTO = mapChatEntityToDTO(messageData[0]);

    pubsub?.publish('MESSAGE', { message: messageDTO });

    return result;
  }
}
