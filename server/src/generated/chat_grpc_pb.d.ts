// package: chat
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as chat_pb from "./chat_pb";
import * as user_pb from "./user_pb";

interface IChatServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    postLobbyChatMessage: IChatServiceService_IPostLobbyChatMessage;
    postGameChatMessage: IChatServiceService_IPostGameChatMessage;
    getMessages: IChatServiceService_IGetMessages;
}

interface IChatServiceService_IPostLobbyChatMessage extends grpc.MethodDefinition<chat_pb.ChatMessageRequest, chat_pb.PostChatMessageResult> {
    path: "/chat.ChatService/PostLobbyChatMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.ChatMessageRequest>;
    requestDeserialize: grpc.deserialize<chat_pb.ChatMessageRequest>;
    responseSerialize: grpc.serialize<chat_pb.PostChatMessageResult>;
    responseDeserialize: grpc.deserialize<chat_pb.PostChatMessageResult>;
}
interface IChatServiceService_IPostGameChatMessage extends grpc.MethodDefinition<chat_pb.ChatMessageRequest, chat_pb.PostChatMessageResult> {
    path: "/chat.ChatService/PostGameChatMessage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.ChatMessageRequest>;
    requestDeserialize: grpc.deserialize<chat_pb.ChatMessageRequest>;
    responseSerialize: grpc.serialize<chat_pb.PostChatMessageResult>;
    responseDeserialize: grpc.deserialize<chat_pb.PostChatMessageResult>;
}
interface IChatServiceService_IGetMessages extends grpc.MethodDefinition<chat_pb.Empty, chat_pb.ChatMessageList> {
    path: "/chat.ChatService/GetMessages";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<chat_pb.Empty>;
    requestDeserialize: grpc.deserialize<chat_pb.Empty>;
    responseSerialize: grpc.serialize<chat_pb.ChatMessageList>;
    responseDeserialize: grpc.deserialize<chat_pb.ChatMessageList>;
}

export const ChatServiceService: IChatServiceService;

export interface IChatServiceServer {
    postLobbyChatMessage: grpc.handleUnaryCall<chat_pb.ChatMessageRequest, chat_pb.PostChatMessageResult>;
    postGameChatMessage: grpc.handleUnaryCall<chat_pb.ChatMessageRequest, chat_pb.PostChatMessageResult>;
    getMessages: grpc.handleUnaryCall<chat_pb.Empty, chat_pb.ChatMessageList>;
}

export interface IChatServiceClient {
    postLobbyChatMessage(request: chat_pb.ChatMessageRequest, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    postLobbyChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    postLobbyChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    postGameChatMessage(request: chat_pb.ChatMessageRequest, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    postGameChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    postGameChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    getMessages(request: chat_pb.Empty, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
    getMessages(request: chat_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
    getMessages(request: chat_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
}

export class ChatServiceClient extends grpc.Client implements IChatServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public postLobbyChatMessage(request: chat_pb.ChatMessageRequest, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public postLobbyChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public postLobbyChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public postGameChatMessage(request: chat_pb.ChatMessageRequest, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public postGameChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public postGameChatMessage(request: chat_pb.ChatMessageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.PostChatMessageResult) => void): grpc.ClientUnaryCall;
    public getMessages(request: chat_pb.Empty, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
    public getMessages(request: chat_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
    public getMessages(request: chat_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: chat_pb.ChatMessageList) => void): grpc.ClientUnaryCall;
}
