import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo } from '../../infrastructure';

interface GetChatMessageRepoOptions {
  userId: string;
  startTime: string;
  endTime: string;
}

interface PostChatMessageRepoOptions {
  userId: string;
  message: string;
  username: string;
}

export interface IChatRepo {
  getChatMessages(options: GetChatMessageRepoOptions): Promise<any>;
  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }>;
}

export class ChatRepo extends BaseMongoRepo implements IChatRepo {
  constructor(db: Promise<Db>) {
    super(db, 'chat-data');
  }

  private _getChatMessagesQuery(options: GetChatMessageRepoOptions) {
    const { startTime, endTime } = options;
    return {};
  }

  private _getChatMessagesStages(options: GetChatMessageRepoOptions) {
    const stages = [{ $match: this._getChatMessagesQuery(options) }];
    return stages;
  }

  getChatMessages(options: GetChatMessageRepoOptions): Promise<any> {
    const stages = this._getChatMessagesStages(options);
    return super.executeAggregate(stages);
  }

  postChatMessage(options: PostChatMessageRepoOptions): Promise<{ id: ObjectId | null }> {
    const { userId, message, username } = options;

    const result = super.create({
      _userId: new ObjectId(userId),
      message,
      username,
      timestamp: Date.now(),
    });

    return result;
  }
}
