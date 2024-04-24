import { ObjectId } from 'mongodb';
import { IUserDTO } from './UserDTO';
import { IUserEntity } from './UserEntity';

export const mapUserEntityToDTO = (entity: IUserEntity): IUserDTO => {
  return {
    id: entity?._id?.toString(),
    email: entity.email,
    firstName: entity.firstName,
    lastName: entity.lastName,
    displayName: entity.displayName,
    avatar: entity.avatar,
    createDate: entity.create_date,
    updateDate: entity.update_date,
  };
};

export const mapUserDTOToEntity = (dto: IUserDTO): IUserEntity => {
  return {
    _id: new ObjectId(dto.id),
    email: dto.email,
    password: '',
    firstName: dto.firstName,
    lastName: dto.lastName,
    displayName: dto.displayName,
    avatar: dto.avatar,
    create_date: dto.createDate,
    update_date: dto.updateDate,
  };
};
