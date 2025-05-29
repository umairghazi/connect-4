import { ObjectId } from "mongodb";
import type { IUserDTO } from "./UserDTO";
import type { IUserEntity } from "./UserEntity";

export const mapUserEntityToDTO = (entity: IUserEntity): IUserDTO => {
  return {
    ...(entity._id && { id: entity._id.toString() }),
    ...(entity.email && { email: entity.email }),
    ...(entity.firstName && { firstName: entity.firstName }),
    ...(entity.lastName && { lastName: entity.lastName }),
    ...(entity.displayName && { displayName: entity.displayName }),
    ...(entity.avatar && { avatar: entity.avatar }),
    ...(entity.create_date && { createDate: entity.create_date }),
    ...(entity.update_date && { updateDate: entity.update_date }),
    ...(entity.isActive && { isActive: entity.isActive }),
  };
};

export const mapUserDTOToEntity = (dto: IUserDTO): IUserEntity => {
  return {
    ...(dto.id && { _id: new ObjectId(dto.id) }),
    ...(dto.email && { email: dto.email }),
    ...(dto.firstName && { firstName: dto.firstName }),
    ...(dto.lastName && { lastName: dto.lastName }),
    ...(dto.displayName && { displayName: dto.displayName }),
    ...(dto.avatar && { avatar: dto.avatar }),
    ...(dto.createDate && { create_date: dto.createDate }),
    ...(dto.updateDate && { update_date: dto.updateDate }),
    ...(dto.isActive && { isActive: dto.isActive }),
  };
};
