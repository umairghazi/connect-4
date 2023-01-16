import { ObjectId } from 'mongodb';
import { IChatRepo } from '../../repositories';

interface GetChatMessageOptions {
}
interface PostChatMessageOptions {
  userId: string;
  message: string;
  gameId: string;
}

export class ChatService {
  private _chatRepo: IChatRepo;

  constructor(repo: IChatRepo) {
    this._chatRepo = repo;
  }

  public async getChatMessages(options: GetChatMessageOptions): Promise<any> {
    return this._chatRepo.getChatMessages(options);
  }
  public async postChatMessage(options: PostChatMessageOptions): Promise<{ id: ObjectId | null }> {
    return this._chatRepo.postChatMessage(options);
  }
}
