// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var game_pb = require('./game_pb.js');
var user_pb = require('./user_pb.js');

function serialize_game_CreateGameRequest(arg) {
  if (!(arg instanceof game_pb.CreateGameRequest)) {
    throw new Error('Expected argument of type game.CreateGameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_game_CreateGameRequest(buffer_arg) {
  return game_pb.CreateGameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_game_Game(arg) {
  if (!(arg instanceof game_pb.Game)) {
    throw new Error('Expected argument of type game.Game');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_game_Game(buffer_arg) {
  return game_pb.Game.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_game_GameListResponse(arg) {
  if (!(arg instanceof game_pb.GameListResponse)) {
    throw new Error('Expected argument of type game.GameListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_game_GameListResponse(buffer_arg) {
  return game_pb.GameListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_game_GameQueryRequest(arg) {
  if (!(arg instanceof game_pb.GameQueryRequest)) {
    throw new Error('Expected argument of type game.GameQueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_game_GameQueryRequest(buffer_arg) {
  return game_pb.GameQueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_game_UpdateGameRequest(arg) {
  if (!(arg instanceof game_pb.UpdateGameRequest)) {
    throw new Error('Expected argument of type game.UpdateGameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_game_UpdateGameRequest(buffer_arg) {
  return game_pb.UpdateGameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GameServiceService = exports.GameServiceService = {
  getGame: {
    path: '/game.GameService/GetGame',
    requestStream: false,
    responseStream: false,
    requestType: game_pb.GameQueryRequest,
    responseType: game_pb.GameListResponse,
    requestSerialize: serialize_game_GameQueryRequest,
    requestDeserialize: deserialize_game_GameQueryRequest,
    responseSerialize: serialize_game_GameListResponse,
    responseDeserialize: deserialize_game_GameListResponse,
  },
  createGame: {
    path: '/game.GameService/CreateGame',
    requestStream: false,
    responseStream: false,
    requestType: game_pb.CreateGameRequest,
    responseType: game_pb.Game,
    requestSerialize: serialize_game_CreateGameRequest,
    requestDeserialize: deserialize_game_CreateGameRequest,
    responseSerialize: serialize_game_Game,
    responseDeserialize: deserialize_game_Game,
  },
  updateGame: {
    path: '/game.GameService/UpdateGame',
    requestStream: false,
    responseStream: false,
    requestType: game_pb.UpdateGameRequest,
    responseType: game_pb.Game,
    requestSerialize: serialize_game_UpdateGameRequest,
    requestDeserialize: deserialize_game_UpdateGameRequest,
    responseSerialize: serialize_game_Game,
    responseDeserialize: deserialize_game_Game,
  },
};

exports.GameServiceClient = grpc.makeGenericClientConstructor(GameServiceService, 'GameService');
