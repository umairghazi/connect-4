import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo } from '../../infrastructure';

export interface IChatRepo {
  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }>;
}

interface PostChatMessageRepoOptions {
  userId: string;
  message: string;
  gameId: string;
}

export class ChatRepo extends BaseMongoRepo implements IChatRepo {
  constructor(db: Promise<Db>) {
    super(db, 'chat-data');
  }

  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }> {
    const { userId, message, gameId } = options;

    const result = super.create({
      _userId: new ObjectId(userId),
      // gameId: new ObjectId(gameId),
      message,
    });

    return result;
  }
}
