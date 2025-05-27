// package: game
// file: game.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";

export class GameQueryRequest extends jspb.Message { 
    getPlayer1id(): string;
    setPlayer1id(value: string): GameQueryRequest;
    getPlayer2id(): string;
    setPlayer2id(value: string): GameQueryRequest;
    getId(): string;
    setId(value: string): GameQueryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameQueryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GameQueryRequest): GameQueryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameQueryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameQueryRequest;
    static deserializeBinaryFromReader(message: GameQueryRequest, reader: jspb.BinaryReader): GameQueryRequest;
}

export namespace GameQueryRequest {
    export type AsObject = {
        player1id: string,
        player2id: string,
        id: string,
    }
}

export class CreateGameRequest extends jspb.Message { 
    getPlayer1id(): string;
    setPlayer1id(value: string): CreateGameRequest;
    getPlayer2id(): string;
    setPlayer2id(value: string): CreateGameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateGameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateGameRequest): CreateGameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateGameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateGameRequest;
    static deserializeBinaryFromReader(message: CreateGameRequest, reader: jspb.BinaryReader): CreateGameRequest;
}

export namespace CreateGameRequest {
    export type AsObject = {
        player1id: string,
        player2id: string,
    }
}

export class UpdateGameRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): UpdateGameRequest;
    getPlayer1id(): string;
    setPlayer1id(value: string): UpdateGameRequest;
    getPlayer2id(): string;
    setPlayer2id(value: string): UpdateGameRequest;
    getGamestatus(): string;
    setGamestatus(value: string): UpdateGameRequest;
    getWhoseturn(): string;
    setWhoseturn(value: string): UpdateGameRequest;
    getBoarddata(): string;
    setBoarddata(value: string): UpdateGameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateGameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateGameRequest): UpdateGameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateGameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateGameRequest;
    static deserializeBinaryFromReader(message: UpdateGameRequest, reader: jspb.BinaryReader): UpdateGameRequest;
}

export namespace UpdateGameRequest {
    export type AsObject = {
        id: string,
        player1id: string,
        player2id: string,
        gamestatus: string,
        whoseturn: string,
        boarddata: string,
    }
}

export class Game extends jspb.Message { 
    getId(): string;
    setId(value: string): Game;
    getPlayer1id(): string;
    setPlayer1id(value: string): Game;
    getPlayer2id(): string;
    setPlayer2id(value: string): Game;
    getGamestatus(): string;
    setGamestatus(value: string): Game;
    getWhoseturn(): string;
    setWhoseturn(value: string): Game;
    getCreatedate(): string;
    setCreatedate(value: string): Game;
    getUpdatedate(): string;
    setUpdatedate(value: string): Game;

    hasPlayer1data(): boolean;
    clearPlayer1data(): void;
    getPlayer1data(): user_pb.UserDTO | undefined;
    setPlayer1data(value?: user_pb.UserDTO): Game;

    hasPlayer2data(): boolean;
    clearPlayer2data(): void;
    getPlayer2data(): user_pb.UserDTO | undefined;
    setPlayer2data(value?: user_pb.UserDTO): Game;
    getBoarddata(): string;
    setBoarddata(value: string): Game;
    getWinnerid(): string;
    setWinnerid(value: string): Game;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Game.AsObject;
    static toObject(includeInstance: boolean, msg: Game): Game.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Game, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Game;
    static deserializeBinaryFromReader(message: Game, reader: jspb.BinaryReader): Game;
}

export namespace Game {
    export type AsObject = {
        id: string,
        player1id: string,
        player2id: string,
        gamestatus: string,
        whoseturn: string,
        createdate: string,
        updatedate: string,
        player1data?: user_pb.UserDTO.AsObject,
        player2data?: user_pb.UserDTO.AsObject,
        boarddata: string,
        winnerid: string,
    }
}

export class GameListResponse extends jspb.Message { 
    clearGamesList(): void;
    getGamesList(): Array<Game>;
    setGamesList(value: Array<Game>): GameListResponse;
    addGames(value?: Game, index?: number): Game;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GameListResponse): GameListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameListResponse;
    static deserializeBinaryFromReader(message: GameListResponse, reader: jspb.BinaryReader): GameListResponse;
}

export namespace GameListResponse {
    export type AsObject = {
        gamesList: Array<Game.AsObject>,
    }
}
