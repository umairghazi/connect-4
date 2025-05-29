import type { Request, Response } from "express";
import { MongoConnector } from "../clients/mongoClient";
import type { IChatDTO } from "../interfaces/ChatDTO";
import { mapChatEntityToDTO } from "../interfaces/ChatMapper";
import type { PostChatMessageRepoOptions } from "../repositories/chatRepo";
import { ChatRepo } from "../repositories/chatRepo";

interface GetChatMessagesQuery {
  userId?: string;
  startTime?: string;
  endTime?: string;
}

const db = MongoConnector.db;
const chatRepo = new ChatRepo(db);

export class ChatController {
  public static async getChatMessages(req: Request, res: Response): Promise<void> {
    const { userId, startTime, endTime } = (req.query as GetChatMessagesQuery) ?? {};

    const result = await chatRepo.getChatMessages({
      userId,
      startTime,
      endTime,
    });

    const messagesDTO = result.map(mapChatEntityToDTO);

    res.status(200).json(messagesDTO);
  }

  public static async postChatMessage(req: Request, res: Response): Promise<void> {
    const { userId, message } = req.body ?? {};

    const messageObj: PostChatMessageRepoOptions = {
      userId,
      message,
    };

    const result = await chatRepo.postChatMessage(messageObj);
    console.log("Message posted, result:", result);
    const messageData = await chatRepo.getChatMessages({ _id: result.id });

    const messageDTO = mapChatEntityToDTO(messageData[0]);

    res.status(201).json(messageDTO);
  }

  public static async handleSocketChatMessage({ userId, message }: { userId: string; message: string }): Promise<IChatDTO> {
    const messageObj: PostChatMessageRepoOptions = { userId, message };
    const result = await chatRepo.postChatMessage(messageObj);

    const messageData = await chatRepo.getChatMessages({ _id: result.id });
    const messageDTO = mapChatEntityToDTO(messageData[0]);
    return messageDTO;
  }
}
