import { gql, useSubscription } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription MESSAGE_SUBSCRIPTION {
    message {
      _id
      _userId
      create_date
      message
    }
  }
`;

export function useMessageSubscription(options?: any) {
  return useSubscription(MESSAGE_SUBSCRIPTION, options)
}