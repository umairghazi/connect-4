import { gql, useQuery } from "@apollo/client";

export interface Message {
  id: string
  userId: string
  message: string
  timestamp: string
  user: {
    id: string
    email: string
    displayName: string
    isActive: boolean
    avatar: string
  }
}

export interface GetChatMessagesData {
  messages: Message[]
}

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages {
    messages {
      id
      userId
      message
      timestamp
      user {
        id
        email
        displayName
        isActive
        avatar
      }
    }
  }
`;

export function useGetChatMessagesQuery(options?: any) {
  return useQuery<GetChatMessagesData>(GET_CHAT_MESSAGES, {
    ...options,
    fetchPolicy: 'cache-and-network'
  })
}