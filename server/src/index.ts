import express from 'express';
import http from 'http';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const app = express();
const httpServer = http.createServer(app);

// gRPC setup
const PROTO_PATH = path.join(__dirname, './proto/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const grpcPackage = grpc.loadPackageDefinition(packageDefinition) as any;
const userService = grpcPackage.user;

const grpcServer = new grpc.Server();
grpcServer.addService(userService.UserService.service, {
  GetUser: (call: any, callback: any) => {
    const { id } = call.request;
    callback(null, { id, name: `User ${id}` });
  },
});
grpcServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('🟢 gRPC server running on port 50051');
});

// Socket.IO setup
const io = new SocketIOServer(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('send-message', (msg) => {
    io.emit('new-message', { from: socket.id, text: msg });
  });
});

// Start Express HTTP server
httpServer.listen(4000, () => {
  console.log(`🚀 HTTP + Socket.IO server running on http://localhost:4000`);
});
