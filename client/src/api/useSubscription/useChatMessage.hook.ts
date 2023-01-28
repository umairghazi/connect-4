import { gql, useSubscription } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION {
    message {
      _id
      userId
      create_date
      message
      picture
      username
    }
  }
`;

export function useMessageSubscription(options?: any) {
  return useSubscription(MESSAGE_SUBSCRIPTION, options)
}