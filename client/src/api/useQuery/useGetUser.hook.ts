import { gql, useLazyQuery } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($token: String) {
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
export function useGetUser(options?: any) {
  return useLazyQuery(GET_USER, options)
}