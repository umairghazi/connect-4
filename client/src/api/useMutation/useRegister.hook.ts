import { gql, useMutation } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String, $password: String, $displayName: String, $avatar: String) {
    registerUser(email: $email, password: $password, displayName: $displayName, avatar: $avatar) {
      token
      user {
        email
        displayName
        avatar
      }
    }
  }
`;

export function useRegisterUserMutation(options?: any) {
  return useMutation(REGISTER_USER, options)
}
