// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var user_pb = require('./user_pb.js');

function serialize_user_AuthResponse(arg) {
  if (!(arg instanceof user_pb.AuthResponse)) {
    throw new Error('Expected argument of type user.AuthResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_AuthResponse(buffer_arg) {
  return user_pb.AuthResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_Empty(arg) {
  if (!(arg instanceof user_pb.Empty)) {
    throw new Error('Expected argument of type user.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_Empty(buffer_arg) {
  return user_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_LoginRequest(arg) {
  if (!(arg instanceof user_pb.LoginRequest)) {
    throw new Error('Expected argument of type user.LoginRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_LoginRequest(buffer_arg) {
  return user_pb.LoginRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_RegisterRequest(arg) {
  if (!(arg instanceof user_pb.RegisterRequest)) {
    throw new Error('Expected argument of type user.RegisterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_RegisterRequest(buffer_arg) {
  return user_pb.RegisterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_StatusRequest(arg) {
  if (!(arg instanceof user_pb.StatusRequest)) {
    throw new Error('Expected argument of type user.StatusRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_StatusRequest(buffer_arg) {
  return user_pb.StatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_StatusResponse(arg) {
  if (!(arg instanceof user_pb.StatusResponse)) {
    throw new Error('Expected argument of type user.StatusResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_StatusResponse(buffer_arg) {
  return user_pb.StatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserDTO(arg) {
  if (!(arg instanceof user_pb.UserDTO)) {
    throw new Error('Expected argument of type user.UserDTO');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserDTO(buffer_arg) {
  return user_pb.UserDTO.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserListResponse(arg) {
  if (!(arg instanceof user_pb.UserListResponse)) {
    throw new Error('Expected argument of type user.UserListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserListResponse(buffer_arg) {
  return user_pb.UserListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_UserQueryRequest(arg) {
  if (!(arg instanceof user_pb.UserQueryRequest)) {
    throw new Error('Expected argument of type user.UserQueryRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_user_UserQueryRequest(buffer_arg) {
  return user_pb.UserQueryRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getUser: {
    path: '/user.UserService/GetUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.UserQueryRequest,
    responseType: user_pb.UserDTO,
    requestSerialize: serialize_user_UserQueryRequest,
    requestDeserialize: deserialize_user_UserQueryRequest,
    responseSerialize: serialize_user_UserDTO,
    responseDeserialize: deserialize_user_UserDTO,
  },
  getActiveUsers: {
    path: '/user.UserService/GetActiveUsers',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.Empty,
    responseType: user_pb.UserListResponse,
    requestSerialize: serialize_user_Empty,
    requestDeserialize: deserialize_user_Empty,
    responseSerialize: serialize_user_UserListResponse,
    responseDeserialize: deserialize_user_UserListResponse,
  },
  loginUser: {
    path: '/user.UserService/LoginUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.LoginRequest,
    responseType: user_pb.AuthResponse,
    requestSerialize: serialize_user_LoginRequest,
    requestDeserialize: deserialize_user_LoginRequest,
    responseSerialize: serialize_user_AuthResponse,
    responseDeserialize: deserialize_user_AuthResponse,
  },
  registerUser: {
    path: '/user.UserService/RegisterUser',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.RegisterRequest,
    responseType: user_pb.AuthResponse,
    requestSerialize: serialize_user_RegisterRequest,
    requestDeserialize: deserialize_user_RegisterRequest,
    responseSerialize: serialize_user_AuthResponse,
    responseDeserialize: deserialize_user_AuthResponse,
  },
  setUserStatus: {
    path: '/user.UserService/SetUserStatus',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.StatusRequest,
    responseType: user_pb.StatusResponse,
    requestSerialize: serialize_user_StatusRequest,
    requestDeserialize: deserialize_user_StatusRequest,
    responseSerialize: serialize_user_StatusResponse,
    responseDeserialize: deserialize_user_StatusResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService, 'UserService');
