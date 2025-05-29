import { ObjectId } from "mongodb";
import type { IGameDTO } from "./GameDTO";
import type { IGameEntity } from "./GameEntity";
import { mapUserDTOToEntity, mapUserEntityToDTO } from "./UserMapper";

export const mapGameEntityToDTO = (entity: IGameEntity): IGameDTO => {
  return {
    ...(entity._id && { id: entity._id.toString() }),
    ...(entity.player1Id && { player1Id: entity.player1Id.toString() }),
    ...(entity.player2Id && { player2Id: entity.player2Id.toString() }),
    ...(entity.whoseTurn && { whoseTurn: entity.whoseTurn.toString() }),
    ...(entity.gameStatus && { gameStatus: entity.gameStatus }),
    ...(entity.create_date && { createDate: entity.create_date }),
    ...(entity.update_date && { updateDate: entity.update_date }),
    ...(entity.boardData && { boardData: entity.boardData }),
    ...(entity.player1Data && { player1Data: mapUserEntityToDTO(entity.player1Data) }),
    ...(entity.player2Data && { player2Data: mapUserEntityToDTO(entity.player2Data) }),
  };
};

export const mapGameDTOToEntity = (dto: IGameDTO): IGameEntity => {
  return {
    ...(dto.id && { _id: new ObjectId(dto.id) }),
    ...(dto.player1Id && { player1Id: new ObjectId(dto.player1Id) }),
    ...(dto.player2Id && { player2Id: new ObjectId(dto.player2Id) }),
    ...(dto.whoseTurn && { whoseTurn: new ObjectId(dto.whoseTurn) }),
    ...(dto.gameStatus && { gameStatus: dto.gameStatus }),
    ...(dto.createDate && { create_date: dto.createDate }),
    ...(dto.updateDate && { update_date: dto.updateDate }),
    ...(dto.boardData && { boardData: dto.boardData }),
    ...(dto.player1Data && { player1Data: mapUserDTOToEntity(dto.player1Data) }),
    ...(dto.player2Data && { player2Data: mapUserDTOToEntity(dto.player2Data) }),
  };
};
