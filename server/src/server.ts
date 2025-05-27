import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

import { ChatServiceService } from "./generated/chat_grpc_pb";
import { GameServiceService } from "./generated/game_grpc_pb";
import { UserServiceService } from "./generated/user_grpc_pb";

import { chatServiceImpl } from "./grpc/chatService";
import { gameServiceImpl } from "./grpc/gameService";
import { userServiceImpl } from "./grpc/userService";


export function startServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const io = new SocketIOServer(httpServer, {
    cors: { origin: '*' },
  });

  io.on('connection', socket => {
    console.log('Socket connected:', socket.id);
    socket.on('chat', msg => {
      io.emit('chat', msg);
    });
  });

  // gRPC setup
  const grpcServer = new grpc.Server();

  grpcServer.addService(ChatServiceService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>, chatServiceImpl);
  grpcServer.addService(UserServiceService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>, userServiceImpl);
  grpcServer.addService(GameServiceService as unknown as grpc.ServiceDefinition<grpc.UntypedServiceImplementation>, gameServiceImpl);

  grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('🟢 gRPC running on port 50051');
  });

  httpServer.listen(4000, () => {
    console.log('🚀 HTTP + Socket.IO server at http://localhost:4000');
  });
}

startServer();