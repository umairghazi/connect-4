import { ObjectId } from 'mongodb';
import { IChatRepo } from '../../repositories';

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

  public async postChatMessage(options: PostChatMessageOptions): Promise<{ id: ObjectId | null }> {
    return this._chatRepo.postChatMessage(options);
  }
}
