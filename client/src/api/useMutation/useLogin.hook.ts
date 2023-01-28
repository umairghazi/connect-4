import { gql, useMutation } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      user {
        email
        firstName
        lastName
        displayName
        avatar
      }
      token
    }
  }
`;

export function useLoginUserMutation(options?: any) {
  return useMutation(LOGIN_USER, options)
}
