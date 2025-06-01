import { ObjectId } from "mongodb";
import type { ChatDTO } from "./ChatDTO";
import type { ChatEntity } from "./ChatEntity";
import type { UserEntity } from "./UserEntity";

export const mapChatEntityToDTO = (entity: ChatEntity & { user: UserEntity }): ChatDTO => {
  return {
    id: entity._id?.toString() ?? "",
    userId: entity.userId?.toString() ?? "",
    message: entity.message ?? "",
    timestamp: entity.timestamp ?? 0,
    createDate: entity.createDate,
    updateDate: entity.updateDate,
    ...(entity.user && {
      user: entity.user,
    }),
  };
};

export const mapChatDTOToEntity = (dto: ChatDTO): ChatEntity => {
  return {
    _id: new ObjectId(dto.id),
    userId: new ObjectId(dto.userId),
    message: dto.message ?? "",
    timestamp: dto.timestamp ?? 0,
    createDate: dto.createDate ?? undefined,
    updateDate: dto.updateDate ?? undefined,
  };
};
