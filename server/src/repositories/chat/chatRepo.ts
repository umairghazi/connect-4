import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo } from '../../infrastructure';

interface GetChatMessageRepoOptions {
}
interface PostChatMessageRepoOptions {
  userId: string;
  message: string;
  gameId: string;
}

export interface IChatRepo {
  getChatMessages(options: GetChatMessageRepoOptions): Promise<any>;
  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }>;
}

export class ChatRepo extends BaseMongoRepo implements IChatRepo {
  constructor(db: Promise<Db>) {
    super(db, 'chat-data');
  }

  getChatMessages(options: GetChatMessageRepoOptions): Promise<any> {
    // const { userId, message, gameId } = options;

    const result = super.executeQuery({});

    return result;
  }

  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }> {
    const { userId, message, gameId } = options;

    const result = super.create({
      _userId: userId,
      message,
    });

    return result;
  }
}
