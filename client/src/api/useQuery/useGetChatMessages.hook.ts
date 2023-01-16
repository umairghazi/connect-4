import { gql, useQuery } from "@apollo/client";

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages {
    getChatMessages {
      message
      create_date
      _userId
      _id
    }
  }
`;

export function useGetChatMessagesQuery(options?: any) {
  return useQuery(GET_CHAT_MESSAGES, options)
}