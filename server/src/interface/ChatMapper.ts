import { ObjectId } from 'mongodb';
import { IChatDTO } from './ChatDTO';
import { IChatEntity } from './ChatEntity';

export const mapChatEntityToDTO = (entity: IChatEntity): IChatDTO => {
  return {
    id: entity._id.toString(),
    userId: entity?.userId?.toString(),
    message: entity.message,
    timestamp: entity.timestamp,
    createDate: entity.create_date,
    updateDate: entity.update_date,
    user: {
      id: entity.user?._id?.toString() ?? '',
      displayName: entity?.user?.displayName ?? '',
      email: entity?.user?.email ?? '',
      isActive: entity?.user?.isActive ?? false,
      avatar: entity?.user?.avatar ?? '',
    },
  };
};

export const mapChatDTOToEntity = (dto: IChatDTO): IChatEntity => {
  return {
    _id: new ObjectId(dto.id),
    userId: new ObjectId(dto.userId),
    message: dto.message,
    timestamp: dto.timestamp,
    create_date: dto.createDate,
    update_date: dto.updateDate,
  };
};
