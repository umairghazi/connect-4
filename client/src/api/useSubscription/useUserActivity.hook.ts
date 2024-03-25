import { gql } from "@apollo/client";

export const USER_ACTIVITY_SUBSCRIPTION = gql`
  subscription USER_ACTIVITY_SUBSCRIPTION {
    userActivity {
      email
      isActive
    }
  }
`;