import { sendUnaryData, ServerUnaryCall, ServiceError, UntypedServiceImplementation } from "@grpc/grpc-js";
import { ChatMessage, ChatMessageList, ChatMessageRequest, Empty, PostChatMessageResult } from "../generated/chat_pb";
import { ChatController } from "../controllers/chatController";

export const chatServiceImpl: UntypedServiceImplementation = {
  async postLobbyChatMessage(call: ServerUnaryCall<ChatMessageRequest, PostChatMessageResult>, callback: sendUnaryData<PostChatMessageResult>) {
    try {
      const resultData = await ChatController.postLobbyChatMessage(call.request.toObject());
      const result = new PostChatMessageResult();
      result.setId(resultData.id);
      callback(null, result);
    } catch (error) {
      callback(error as ServiceError, null);
    }
  },

  async postGameChatMessage (call: ServerUnaryCall<ChatMessageRequest, PostChatMessageResult>, callback: sendUnaryData<PostChatMessageResult>) {
    try {
      const resultData = await ChatController.postGameChatMessage(call.request.toObject());
      const result = new PostChatMessageResult();
      result.setId(resultData.id);
      callback(null, result);
    } catch (error) {
      callback(error as ServiceError, null);
    }
  },

  async getMessages (call: ServerUnaryCall<Empty, ChatMessageList>, callback: sendUnaryData<ChatMessageList>) {
    try {
      const rawMessages = await ChatController.getMessages();

      const list = new ChatMessageList();
      const messages = rawMessages.map((msg: any) => {
        const m = new ChatMessage();
        m.setId(msg.id);
        m.setUserid(msg.userId);
        m.setMessage(msg.message);
        m.setTimestamp(msg.timestamp);
        m.setCreatedate(msg.createDate);
        m.setUpdatedate(msg.updateDate);
        // If userDTO exists
        // const user = new user_pb.UserDTO();
        // user.setId(msg.user.id);
        // m.setUser(user);
        return m;
      });
      list.setMessagesList(messages);
      callback(null, list);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  }
};
