import { gql, useLazyQuery } from "@apollo/client";

export const GET_USER = gql`
  query getUser($token: String) {
    getUser(token: $token) {
      id
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
      id
      email
      firstName
      lastName
      displayName
      avatar
    }
  }
`;

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
}

export interface GetUserResult {
  getUser: IUser
}

export interface GetActiveUserResult {
  getActiveUsers: IUser[]
}

export function useGetUserLazyQuery(options?: any) {
  return useLazyQuery<GetUserResult>(GET_USER, options)
}

export function useGetActiveUsersLazyQuery(options?: any) {
  return useLazyQuery<GetActiveUserResult>(GET_ACTIVE_USERS, options)
}