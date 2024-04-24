import { ObjectId } from 'mongodb';
import { IGameDTO } from './GameDTO';
import { IGameEntity } from './GameEntity';

export const mapGameEntityToDTO = (entity: IGameEntity): IGameDTO => {
  return {
    id: entity?._id?.toString(),
  };
};

export const mapGameDTOToEntity = (dto: IGameDTO): IGameEntity => {
  return {
    _id: new ObjectId(dto.id),
  };
};
