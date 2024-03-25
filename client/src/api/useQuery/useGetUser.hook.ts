import { gql, useLazyQuery } from "@apollo/client";

export const GET_USER = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      _id
      email
      firstName
      lastName
      displayName
      avatar
    }
  }
`;

export const GET_ACTIVE_USERS = gql`
  query getActiveUsers {
    getActiveUsers {
      _id
      email
      firstName
      lastName
      displayName
      avatar
    }
  }
`;

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
}

export interface GetUserResult {
  getUser: User
}

export function useGetUser(options?: any) {
  return useLazyQuery<GetUserResult>(GET_USER, options)
}

export function useGetActiveUsers(options?: any) {
  return useLazyQuery(GET_ACTIVE_USERS, options)
}