import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo, CreateResult } from '../../infrastructure';
import { IChatEntity } from '../../interface';

export interface GetChatMessageRepoOptions {
  userId?: string;
  startTime?: string;
  endTime?: string;
  _id?: ObjectId | null;
}

export interface PostChatMessageRepoOptions {
  userId: string;
  message: string;
}

export interface IChatRepo {
  getChatMessages(options: GetChatMessageRepoOptions): Promise<IChatEntity[]>;
  postChatMessage(options: PostChatMessageRepoOptions): Promise<CreateResult>;
}

/**
 * ChatRepo
 * @export
 * @class ChatRepo
 * @extends {BaseMongoRepo}
 * @implements {IChatRepo}
 */
export class ChatRepo extends BaseMongoRepo implements IChatRepo {
  /**
   * Creates an instance of ChatRepo.
   * @param {Promise<Db>} db
   */
  constructor(db: Promise<Db>) {
    super(db, 'lobby-chat-data');
  }

  /**
   * _getChatMessagesStages
   * @private
   * @param {GetChatMessageRepoOptions} options
   */
  private _getChatMessagesStages(options: GetChatMessageRepoOptions) {
    const { startTime, endTime, _id } = options;

    const pipeline: Record<string, unknown>[] = [];

    const matchStage: Record<string, unknown> = {};

    if (startTime && endTime) {
      matchStage.timestamp = {
        $gte: new Date(startTime).getTime(),
        $lte: new Date(endTime).getTime(),
      };
      pipeline.push({ $match: matchStage });
    }

    if (_id) {
      pipeline.push({
        $match: { _id },
      });
    }

    pipeline.push({
      $lookup: {
        from: 'user-data',
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    });

    pipeline.push({
      $unwind: '$user',
    });

    pipeline.push({
      $project: {
        _id: 1,
        message: 1,
        timestamp: 1,
        'user._id': 1,
        'user.displayName': 1,
        'user.email': 1,
        'user.isActive': 1,
        'user.avatar': 1,
      },
    });

    return pipeline;
  }

  /**
   * getChatMessages
   * @param {GetChatMessageRepoOptions} options
   * @returns {Promise<IChatEntity[]>}
   */
  public async getChatMessages(options: GetChatMessageRepoOptions): Promise<IChatEntity[]> {
    const stages = this._getChatMessagesStages(options);
    return super.executeAggregate<IChatEntity>(stages);
  }

  /**
   * postChatMessage
   * @param {PostChatMessageRepoOptions} options
   * @returns {Promise<CreateResult>}
   */
  public async postChatMessage(options: PostChatMessageRepoOptions): Promise<CreateResult> {
    const { userId, message } = options;

    const result = super.create({
      userId: new ObjectId(userId),
      message,
      timestamp: Date.now(),
    });

    return result;
  }
}
