import { ObjectId } from "mongodb";
import type { UserDTO } from "./UserDTO";
import type { UserEntity } from "./UserEntity";

export const mapUserEntityToDTO = (entity: UserEntity): UserDTO => ({
  id: entity._id?.toString(),
  email: entity.email ?? undefined,
  firstName: entity.firstName ?? undefined,
  lastName: entity.lastName ?? undefined,
  displayName: entity.displayName ?? undefined,
  avatar: entity.avatar ?? undefined,
  createDate: entity.createDate ?? undefined,
  updateDate: entity.updateDate ?? undefined,
  isActive: entity.isActive ?? undefined,
});

export const mapUserDTOToEntity = (dto: UserDTO): UserEntity => ({
  _id: dto.id ? new ObjectId(dto.id) : undefined,
  email: dto.email ?? undefined,
  firstName: dto.firstName ?? undefined,
  lastName: dto.lastName ?? undefined,
  displayName: dto.displayName ?? undefined,
  avatar: dto.avatar ?? undefined,
  createDate: dto.createDate ?? undefined,
  updateDate: dto.updateDate ?? undefined,
  isActive: dto.isActive ?? undefined,
});
