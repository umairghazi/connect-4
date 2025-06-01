import type { Db } from "mongodb";
import { ObjectId } from "mongodb";
import type { ChatEntity, ChatEntityWithUser } from "../interfaces/ChatEntity";
import type { CreateResult } from "./baseMongoRepo";
import { BaseMongoRepo } from "./baseMongoRepo";

export interface GetChatMessageRepoOptions {
  userId?: string;
  startTime?: string;
  endTime?: string;
  gameId?: string;
  _id?: ObjectId | null;
}

export interface PostChatMessageRepoOptions {
  userId: string;
  message: string;
  gameId?: string;
}

export interface IChatRepo {
  getChatMessages(options: GetChatMessageRepoOptions): Promise<ChatEntity[]>;
  postChatMessage(options: PostChatMessageRepoOptions): Promise<CreateResult>;
}

export class ChatRepo extends BaseMongoRepo implements IChatRepo {
  constructor(db: Promise<Db>) {
    super(db, "lobby-chat-data");
  }

  private _getChatMessagesStages(options: GetChatMessageRepoOptions) {
    const { startTime, endTime, _id, userId, gameId } = options;

    const pipeline: Record<string, unknown>[] = [];
    const matchStage: Record<string, unknown> = {};

    if (startTime && endTime) {
      matchStage.timestamp = {
        $gte: new Date(startTime).getTime(),
        $lte: new Date(endTime).getTime(),
      };
    }

    if (userId) {
      matchStage.userId = new ObjectId(userId);
    }

    if (gameId) {
      matchStage.gameId = new ObjectId(gameId);
    } else {
      matchStage.gameId = { $exists: false };
    }

    if (_id) {
      matchStage._id = new ObjectId(_id);
    }

    pipeline.push({ $match: matchStage });

    pipeline.push({
      $lookup: {
        from: "user-data",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    });

    pipeline.push({ $unwind: "$user" });

    pipeline.push({
      $project: {
        "_id": 1,
        "message": 1,
        "timestamp": 1,
        "user._id": 1,
        "user.displayName": 1,
        "user.email": 1,
        "user.isActive": 1,
        "user.avatar": 1,
      },
    });

    return pipeline;
  }

  public async getChatMessages(options: GetChatMessageRepoOptions): Promise<ChatEntityWithUser[]> {
    const stages = this._getChatMessagesStages(options);
    return super.executeAggregate<ChatEntityWithUser>(stages);
  }

  public async postChatMessage(options: PostChatMessageRepoOptions): Promise<CreateResult> {
    const { userId, gameId, message } = options;

    const result = super.create({
      userId: new ObjectId(userId),
      ...(gameId && { gameId: new ObjectId(gameId) }),
      message,
      timestamp: Date.now(),
    });

    return result;
  }
}
