// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var chat_pb = require('./chat_pb.js');
var user_pb = require('./user_pb.js');

function serialize_chat_ChatMessageList(arg) {
  if (!(arg instanceof chat_pb.ChatMessageList)) {
    throw new Error('Expected argument of type chat.ChatMessageList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_ChatMessageList(buffer_arg) {
  return chat_pb.ChatMessageList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_ChatMessageRequest(arg) {
  if (!(arg instanceof chat_pb.ChatMessageRequest)) {
    throw new Error('Expected argument of type chat.ChatMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_ChatMessageRequest(buffer_arg) {
  return chat_pb.ChatMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_Empty(arg) {
  if (!(arg instanceof chat_pb.Empty)) {
    throw new Error('Expected argument of type chat.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_Empty(buffer_arg) {
  return chat_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chat_PostChatMessageResult(arg) {
  if (!(arg instanceof chat_pb.PostChatMessageResult)) {
    throw new Error('Expected argument of type chat.PostChatMessageResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chat_PostChatMessageResult(buffer_arg) {
  return chat_pb.PostChatMessageResult.deserializeBinary(new Uint8Array(buffer_arg));
}


var ChatServiceService = exports.ChatServiceService = {
  postLobbyChatMessage: {
    path: '/chat.ChatService/PostLobbyChatMessage',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.ChatMessageRequest,
    responseType: chat_pb.PostChatMessageResult,
    requestSerialize: serialize_chat_ChatMessageRequest,
    requestDeserialize: deserialize_chat_ChatMessageRequest,
    responseSerialize: serialize_chat_PostChatMessageResult,
    responseDeserialize: deserialize_chat_PostChatMessageResult,
  },
  postGameChatMessage: {
    path: '/chat.ChatService/PostGameChatMessage',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.ChatMessageRequest,
    responseType: chat_pb.PostChatMessageResult,
    requestSerialize: serialize_chat_ChatMessageRequest,
    requestDeserialize: deserialize_chat_ChatMessageRequest,
    responseSerialize: serialize_chat_PostChatMessageResult,
    responseDeserialize: deserialize_chat_PostChatMessageResult,
  },
  getMessages: {
    path: '/chat.ChatService/GetMessages',
    requestStream: false,
    responseStream: false,
    requestType: chat_pb.Empty,
    responseType: chat_pb.ChatMessageList,
    requestSerialize: serialize_chat_Empty,
    requestDeserialize: deserialize_chat_Empty,
    responseSerialize: serialize_chat_ChatMessageList,
    responseDeserialize: deserialize_chat_ChatMessageList,
  },
};

exports.ChatServiceClient = grpc.makeGenericClientConstructor(ChatServiceService, 'ChatService');
