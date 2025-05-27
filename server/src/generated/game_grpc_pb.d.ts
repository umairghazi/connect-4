// package: game
// file: game.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as game_pb from "./game_pb";
import * as user_pb from "./user_pb";

interface IGameServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getGame: IGameServiceService_IGetGame;
    createGame: IGameServiceService_ICreateGame;
    updateGame: IGameServiceService_IUpdateGame;
}

interface IGameServiceService_IGetGame extends grpc.MethodDefinition<game_pb.GameQueryRequest, game_pb.GameListResponse> {
    path: "/game.GameService/GetGame";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<game_pb.GameQueryRequest>;
    requestDeserialize: grpc.deserialize<game_pb.GameQueryRequest>;
    responseSerialize: grpc.serialize<game_pb.GameListResponse>;
    responseDeserialize: grpc.deserialize<game_pb.GameListResponse>;
}
interface IGameServiceService_ICreateGame extends grpc.MethodDefinition<game_pb.CreateGameRequest, game_pb.Game> {
    path: "/game.GameService/CreateGame";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<game_pb.CreateGameRequest>;
    requestDeserialize: grpc.deserialize<game_pb.CreateGameRequest>;
    responseSerialize: grpc.serialize<game_pb.Game>;
    responseDeserialize: grpc.deserialize<game_pb.Game>;
}
interface IGameServiceService_IUpdateGame extends grpc.MethodDefinition<game_pb.UpdateGameRequest, game_pb.Game> {
    path: "/game.GameService/UpdateGame";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<game_pb.UpdateGameRequest>;
    requestDeserialize: grpc.deserialize<game_pb.UpdateGameRequest>;
    responseSerialize: grpc.serialize<game_pb.Game>;
    responseDeserialize: grpc.deserialize<game_pb.Game>;
}

export const GameServiceService: IGameServiceService;

export interface IGameServiceServer {
    getGame: grpc.handleUnaryCall<game_pb.GameQueryRequest, game_pb.GameListResponse>;
    createGame: grpc.handleUnaryCall<game_pb.CreateGameRequest, game_pb.Game>;
    updateGame: grpc.handleUnaryCall<game_pb.UpdateGameRequest, game_pb.Game>;
}

export interface IGameServiceClient {
    getGame(request: game_pb.GameQueryRequest, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    getGame(request: game_pb.GameQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    getGame(request: game_pb.GameQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    createGame(request: game_pb.CreateGameRequest, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    createGame(request: game_pb.CreateGameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    createGame(request: game_pb.CreateGameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    updateGame(request: game_pb.UpdateGameRequest, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    updateGame(request: game_pb.UpdateGameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    updateGame(request: game_pb.UpdateGameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
}

export class GameServiceClient extends grpc.Client implements IGameServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getGame(request: game_pb.GameQueryRequest, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    public getGame(request: game_pb.GameQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    public getGame(request: game_pb.GameQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.GameListResponse) => void): grpc.ClientUnaryCall;
    public createGame(request: game_pb.CreateGameRequest, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    public createGame(request: game_pb.CreateGameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    public createGame(request: game_pb.CreateGameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    public updateGame(request: game_pb.UpdateGameRequest, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    public updateGame(request: game_pb.UpdateGameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
    public updateGame(request: game_pb.UpdateGameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: game_pb.Game) => void): grpc.ClientUnaryCall;
}
