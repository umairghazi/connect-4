// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IUserServiceService_IGetUser;
    loginUser: IUserServiceService_ILoginUser;
    registerUser: IUserServiceService_IRegisterUser;
    setUserStatus: IUserServiceService_ISetUserStatus;
}

interface IUserServiceService_IGetUser extends grpc.MethodDefinition<user_pb.UserRequest, user_pb.UserResponse> {
    path: "/user.UserService/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.UserRequest>;
    requestDeserialize: grpc.deserialize<user_pb.UserRequest>;
    responseSerialize: grpc.serialize<user_pb.UserResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserResponse>;
}
interface IUserServiceService_ILoginUser extends grpc.MethodDefinition<user_pb.LoginRequest, user_pb.LoginResponse> {
    path: "/user.UserService/LoginUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<user_pb.LoginRequest>;
    responseSerialize: grpc.serialize<user_pb.LoginResponse>;
    responseDeserialize: grpc.deserialize<user_pb.LoginResponse>;
}
interface IUserServiceService_IRegisterUser extends grpc.MethodDefinition<user_pb.RegisterRequest, user_pb.RegisterResponse> {
    path: "/user.UserService/RegisterUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.RegisterRequest>;
    requestDeserialize: grpc.deserialize<user_pb.RegisterRequest>;
    responseSerialize: grpc.serialize<user_pb.RegisterResponse>;
    responseDeserialize: grpc.deserialize<user_pb.RegisterResponse>;
}
interface IUserServiceService_ISetUserStatus extends grpc.MethodDefinition<user_pb.StatusRequest, user_pb.StatusResponse> {
    path: "/user.UserService/SetUserStatus";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.StatusRequest>;
    requestDeserialize: grpc.deserialize<user_pb.StatusRequest>;
    responseSerialize: grpc.serialize<user_pb.StatusResponse>;
    responseDeserialize: grpc.deserialize<user_pb.StatusResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer {
    getUser: grpc.handleUnaryCall<user_pb.UserRequest, user_pb.UserResponse>;
    loginUser: grpc.handleUnaryCall<user_pb.LoginRequest, user_pb.LoginResponse>;
    registerUser: grpc.handleUnaryCall<user_pb.RegisterRequest, user_pb.RegisterResponse>;
    setUserStatus: grpc.handleUnaryCall<user_pb.StatusRequest, user_pb.StatusResponse>;
}

export interface IUserServiceClient {
    getUser(request: user_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: user_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    getUser(request: user_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUser(request: user_pb.UserRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: user_pb.UserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public getUser(request: user_pb.UserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.LoginResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.RegisterResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
}
