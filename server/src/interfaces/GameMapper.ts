import { ObjectId } from "mongodb";
import type { GameDTO } from "./GameDTO";
import type { GameEntity } from "./GameEntity";
import type { UserDTO } from "./UserDTO";
import { mapUserEntityToDTO } from "./UserMapper";

export const mapGameEntityToDTO = (entity: GameEntity & { playerData?: UserDTO[] }): GameDTO => {
  return {
    id: entity._id?.toString() ?? "",
    startedBy: entity.startedBy.toString(),
    playerIds: entity.playerIds?.map((id) => id.toString()) ?? [],
    currentTurnIndex: entity.currentTurnIndex ?? 0,
    winnerId: entity.winnerId?.toString(),
    gameStatus: entity.gameStatus ?? null,
    boardData: entity.boardData,
    createDate: entity.createDate,
    updateDate: entity.updateDate,
    ...(entity.playerData && {
      playerData: entity.playerData.map(mapUserEntityToDTO),
    }),
  };
};

export const mapGameDTOToEntity = (dto: Partial<GameDTO>): GameEntity => {
  return {
    ...(dto.id && { _id: new ObjectId(dto.id) }),
    startedBy: new ObjectId(dto.startedBy),
    playerIds: (dto.playerIds ?? []).map((id) => new ObjectId(id)),
    currentTurnIndex: dto.currentTurnIndex ?? 0,
    winnerId: dto.winnerId ? new ObjectId(dto.winnerId) : null,
    gameStatus: dto.gameStatus ?? null,
    boardData: dto.boardData ?? "",
    createDate: dto.createDate ?? new Date(),
    updateDate: dto.updateDate ?? new Date(),
  };
};
