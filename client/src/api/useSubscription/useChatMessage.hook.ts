import { gql, useSubscription } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION {
    message {
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

export function useMessageSubscription(options?: any) {
  return useSubscription(MESSAGE_SUBSCRIPTION, options)
}