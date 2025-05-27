// package: user
// file: user.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class UserQueryRequest extends jspb.Message { 
    getToken(): string;
    setToken(value: string): UserQueryRequest;
    getEmail(): string;
    setEmail(value: string): UserQueryRequest;
    getId(): string;
    setId(value: string): UserQueryRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserQueryRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UserQueryRequest): UserQueryRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserQueryRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserQueryRequest;
    static deserializeBinaryFromReader(message: UserQueryRequest, reader: jspb.BinaryReader): UserQueryRequest;
}

export namespace UserQueryRequest {
    export type AsObject = {
        token: string,
        email: string,
        id: string,
    }
}

export class UserDTO extends jspb.Message { 
    getId(): string;
    setId(value: string): UserDTO;
    getEmail(): string;
    setEmail(value: string): UserDTO;
    getFirstname(): string;
    setFirstname(value: string): UserDTO;
    getLastname(): string;
    setLastname(value: string): UserDTO;
    getDisplayname(): string;
    setDisplayname(value: string): UserDTO;
    getAvatar(): string;
    setAvatar(value: string): UserDTO;
    getCreatedate(): string;
    setCreatedate(value: string): UserDTO;
    getUpdatedate(): string;
    setUpdatedate(value: string): UserDTO;
    getIsactive(): boolean;
    setIsactive(value: boolean): UserDTO;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserDTO.AsObject;
    static toObject(includeInstance: boolean, msg: UserDTO): UserDTO.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserDTO, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserDTO;
    static deserializeBinaryFromReader(message: UserDTO, reader: jspb.BinaryReader): UserDTO;
}

export namespace UserDTO {
    export type AsObject = {
        id: string,
        email: string,
        firstname: string,
        lastname: string,
        displayname: string,
        avatar: string,
        createdate: string,
        updatedate: string,
        isactive: boolean,
    }
}

export class UserListResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<UserDTO>;
    setUsersList(value: Array<UserDTO>): UserListResponse;
    addUsers(value?: UserDTO, index?: number): UserDTO;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UserListResponse): UserListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserListResponse;
    static deserializeBinaryFromReader(message: UserListResponse, reader: jspb.BinaryReader): UserListResponse;
}

export namespace UserListResponse {
    export type AsObject = {
        usersList: Array<UserDTO.AsObject>,
    }
}

export class LoginRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): LoginRequest;
    getPassword(): string;
    setPassword(value: string): LoginRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LoginRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LoginRequest;
    static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
    export type AsObject = {
        email: string,
        password: string,
    }
}

export class RegisterRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): RegisterRequest;
    getPassword(): string;
    setPassword(value: string): RegisterRequest;
    getFirstname(): string;
    setFirstname(value: string): RegisterRequest;
    getLastname(): string;
    setLastname(value: string): RegisterRequest;
    getDisplayname(): string;
    setDisplayname(value: string): RegisterRequest;
    getAvatar(): string;
    setAvatar(value: string): RegisterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegisterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegisterRequest;
    static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
    export type AsObject = {
        email: string,
        password: string,
        firstname: string,
        lastname: string,
        displayname: string,
        avatar: string,
    }
}

export class AuthResponse extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): UserDTO | undefined;
    setUser(value?: UserDTO): AuthResponse;
    getToken(): string;
    setToken(value: string): AuthResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AuthResponse): AuthResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthResponse;
    static deserializeBinaryFromReader(message: AuthResponse, reader: jspb.BinaryReader): AuthResponse;
}

export namespace AuthResponse {
    export type AsObject = {
        user?: UserDTO.AsObject,
        token: string,
    }
}

export class StatusRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): StatusRequest;
    getIsactive(): boolean;
    setIsactive(value: boolean): StatusRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatusRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StatusRequest): StatusRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatusRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatusRequest;
    static deserializeBinaryFromReader(message: StatusRequest, reader: jspb.BinaryReader): StatusRequest;
}

export namespace StatusRequest {
    export type AsObject = {
        email: string,
        isactive: boolean,
    }
}

export class StatusResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): StatusResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StatusResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StatusResponse): StatusResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StatusResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StatusResponse;
    static deserializeBinaryFromReader(message: StatusResponse, reader: jspb.BinaryReader): StatusResponse;
}

export namespace StatusResponse {
    export type AsObject = {
        success: boolean,
    }
}
