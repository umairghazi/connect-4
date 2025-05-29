import { ObjectId } from "mongodb";
import type { IChatDTO } from "./ChatDTO";
import type { IChatEntity } from "./ChatEntity";

export const mapChatEntityToDTO = (entity: IChatEntity): IChatDTO => {
  return {
    ...(entity._id && { id: entity._id.toString() }),
    ...(entity.userId && { userId: entity.userId.toString() }),
    ...(entity.message && { message: entity.message }),
    ...(entity.timestamp && { timestamp: entity.timestamp }),
    ...(entity.create_date && { createDate: entity.create_date }),
    ...(entity.update_date && { updateDate: entity.update_date }),
    ...(entity.user && {
      user: {
        ...(entity.user._id && { id: entity.user._id.toString() }),
        ...(entity.user.email && { email: entity.user.email }),
        ...(entity.user.firstName && { firstName: entity.user.firstName }),
        ...(entity.user.lastName && { lastName: entity.user.lastName }),
        ...(entity.user.displayName && { displayName: entity.user.displayName }),
        ...(entity.user.avatar && { avatar: entity.user.avatar }),
        ...(entity.user.create_date && { createDate: entity.user.create_date }),
        ...(entity.user.update_date && { updateDate: entity.user.update_date }),
        ...(entity.user.isActive && { isActive: entity.user.isActive }),
      },
    }),
  };
};

export const mapChatDTOToEntity = (dto: IChatDTO): IChatEntity => {
  return {
    ...(dto.id && { _id: new ObjectId(dto.id) }),
    ...(dto.userId && { userId: new ObjectId(dto.userId) }),
    ...(dto.message && { message: dto.message }),
    ...(dto.timestamp && { timestamp: dto.timestamp }),
    ...(dto.createDate && { create_date: dto.createDate }),
    ...(dto.updateDate && { update_date: dto.updateDate }),
  };
};
