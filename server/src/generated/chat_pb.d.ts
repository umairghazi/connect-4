// package: chat
// file: chat.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as user_pb from "./user_pb";

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

export class ChatMessageRequest extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): ChatMessageRequest;
    getMessage(): string;
    setMessage(value: string): ChatMessageRequest;
    getUsername(): string;
    setUsername(value: string): ChatMessageRequest;
    getPicture(): string;
    setPicture(value: string): ChatMessageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChatMessageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ChatMessageRequest): ChatMessageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChatMessageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChatMessageRequest;
    static deserializeBinaryFromReader(message: ChatMessageRequest, reader: jspb.BinaryReader): ChatMessageRequest;
}

export namespace ChatMessageRequest {
    export type AsObject = {
        userid: string,
        message: string,
        username: string,
        picture: string,
    }
}

export class PostChatMessageResult extends jspb.Message { 
    getId(): string;
    setId(value: string): PostChatMessageResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PostChatMessageResult.AsObject;
    static toObject(includeInstance: boolean, msg: PostChatMessageResult): PostChatMessageResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PostChatMessageResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PostChatMessageResult;
    static deserializeBinaryFromReader(message: PostChatMessageResult, reader: jspb.BinaryReader): PostChatMessageResult;
}

export namespace PostChatMessageResult {
    export type AsObject = {
        id: string,
    }
}

export class ChatMessage extends jspb.Message { 
    getId(): string;
    setId(value: string): ChatMessage;
    getUserid(): string;
    setUserid(value: string): ChatMessage;
    getMessage(): string;
    setMessage(value: string): ChatMessage;
    getTimestamp(): string;
    setTimestamp(value: string): ChatMessage;
    getCreatedate(): string;
    setCreatedate(value: string): ChatMessage;
    getUpdatedate(): string;
    setUpdatedate(value: string): ChatMessage;

    hasUser(): boolean;
    clearUser(): void;
    getUser(): user_pb.UserDTO | undefined;
    setUser(value?: user_pb.UserDTO): ChatMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChatMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChatMessage;
    static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
    export type AsObject = {
        id: string,
        userid: string,
        message: string,
        timestamp: string,
        createdate: string,
        updatedate: string,
        user?: user_pb.UserDTO.AsObject,
    }
}

export class ChatMessageList extends jspb.Message { 
    clearMessagesList(): void;
    getMessagesList(): Array<ChatMessage>;
    setMessagesList(value: Array<ChatMessage>): ChatMessageList;
    addMessages(value?: ChatMessage, index?: number): ChatMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChatMessageList.AsObject;
    static toObject(includeInstance: boolean, msg: ChatMessageList): ChatMessageList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChatMessageList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChatMessageList;
    static deserializeBinaryFromReader(message: ChatMessageList, reader: jspb.BinaryReader): ChatMessageList;
}

export namespace ChatMessageList {
    export type AsObject = {
        messagesList: Array<ChatMessage.AsObject>,
    }
}
