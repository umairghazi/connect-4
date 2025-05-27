// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUser: IUserServiceService_IGetUser;
    getActiveUsers: IUserServiceService_IGetActiveUsers;
    loginUser: IUserServiceService_ILoginUser;
    registerUser: IUserServiceService_IRegisterUser;
    setUserStatus: IUserServiceService_ISetUserStatus;
}

interface IUserServiceService_IGetUser extends grpc.MethodDefinition<user_pb.UserQueryRequest, user_pb.UserDTO> {
    path: "/user.UserService/GetUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.UserQueryRequest>;
    requestDeserialize: grpc.deserialize<user_pb.UserQueryRequest>;
    responseSerialize: grpc.serialize<user_pb.UserDTO>;
    responseDeserialize: grpc.deserialize<user_pb.UserDTO>;
}
interface IUserServiceService_IGetActiveUsers extends grpc.MethodDefinition<user_pb.Empty, user_pb.UserListResponse> {
    path: "/user.UserService/GetActiveUsers";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.Empty>;
    requestDeserialize: grpc.deserialize<user_pb.Empty>;
    responseSerialize: grpc.serialize<user_pb.UserListResponse>;
    responseDeserialize: grpc.deserialize<user_pb.UserListResponse>;
}
interface IUserServiceService_ILoginUser extends grpc.MethodDefinition<user_pb.LoginRequest, user_pb.AuthResponse> {
    path: "/user.UserService/LoginUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.LoginRequest>;
    requestDeserialize: grpc.deserialize<user_pb.LoginRequest>;
    responseSerialize: grpc.serialize<user_pb.AuthResponse>;
    responseDeserialize: grpc.deserialize<user_pb.AuthResponse>;
}
interface IUserServiceService_IRegisterUser extends grpc.MethodDefinition<user_pb.RegisterRequest, user_pb.AuthResponse> {
    path: "/user.UserService/RegisterUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<user_pb.RegisterRequest>;
    requestDeserialize: grpc.deserialize<user_pb.RegisterRequest>;
    responseSerialize: grpc.serialize<user_pb.AuthResponse>;
    responseDeserialize: grpc.deserialize<user_pb.AuthResponse>;
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
    getUser: grpc.handleUnaryCall<user_pb.UserQueryRequest, user_pb.UserDTO>;
    getActiveUsers: grpc.handleUnaryCall<user_pb.Empty, user_pb.UserListResponse>;
    loginUser: grpc.handleUnaryCall<user_pb.LoginRequest, user_pb.AuthResponse>;
    registerUser: grpc.handleUnaryCall<user_pb.RegisterRequest, user_pb.AuthResponse>;
    setUserStatus: grpc.handleUnaryCall<user_pb.StatusRequest, user_pb.StatusResponse>;
}

export interface IUserServiceClient {
    getUser(request: user_pb.UserQueryRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    getUser(request: user_pb.UserQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    getUser(request: user_pb.UserQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    getActiveUsers(request: user_pb.Empty, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    getActiveUsers(request: user_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    getActiveUsers(request: user_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUser(request: user_pb.UserQueryRequest, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    public getUser(request: user_pb.UserQueryRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    public getUser(request: user_pb.UserQueryRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserDTO) => void): grpc.ClientUnaryCall;
    public getActiveUsers(request: user_pb.Empty, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public getActiveUsers(request: user_pb.Empty, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public getActiveUsers(request: user_pb.Empty, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.UserListResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public loginUser(request: user_pb.LoginRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public registerUser(request: user_pb.RegisterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.AuthResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
    public setUserStatus(request: user_pb.StatusRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.StatusResponse) => void): grpc.ClientUnaryCall;
}
