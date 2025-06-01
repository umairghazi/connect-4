import { ObjectId } from "mongodb";
import type { GameDTO } from "./GameDTO";
import type { GameEntity } from "./GameEntity";
import { mapUserDTOToEntity, mapUserEntityToDTO } from "./UserMapper";

export const mapGameEntityToDTO = (entity: GameEntity): GameDTO => {
  return {
    ...(entity._id && { id: entity._id.toString() }),
    ...(entity.player1Id && { player1Id: entity.player1Id.toString() }),
    ...(entity.player2Id && { player2Id: entity.player2Id.toString() }),
    ...(entity.gameStatus && { gameStatus: entity.gameStatus }),
    ...(entity.boardData && { boardData: entity.boardData }),
    ...(entity.winnerId && { winnerId: entity.winnerId.toString() }),
    ...(entity.whoseTurn && { whoseTurn: entity.whoseTurn.toString() }),
    ...(entity.player1Data && { player1Data: mapUserEntityToDTO(entity.player1Data) }),
    ...(entity.player2Data && { player2Data: mapUserEntityToDTO(entity.player2Data) }),
    ...(entity.createDate && { createDate: entity.createDate }),
    ...(entity.updateDate && { updateDate: entity.updateDate }),
  };
};

export const mapGameDTOToEntity = (dto: GameDTO): GameEntity => {
  return {
    ...(dto.id && { _id: dto.id }),
    ...(dto.player1Id && { player1Id: new ObjectId(dto.player1Id) }),
    ...(dto.player2Id && { player2Id: new ObjectId(dto.player2Id) }),
    ...(dto.gameStatus && { gameStatus: dto.gameStatus }),
    ...(dto.winnerId && { winnerId: new ObjectId(dto.winnerId) }),
    ...(dto.whoseTurn && { whoseTurn: new ObjectId(dto.whoseTurn) }),
    ...(dto.boardData && { boardData: dto.boardData }),
    ...(dto.player1Data && { player1Data: mapUserDTOToEntity(dto.player1Data) }),
    ...(dto.player2Data && { player2Data: mapUserDTOToEntity(dto.player2Data) }),
    ...(dto.createDate && { create_date: dto.createDate }),
    ...(dto.updateDate && { update_date: dto.updateDate }),
  };
};
