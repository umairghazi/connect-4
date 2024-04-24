import { gql, useMutation } from "@apollo/client";

export const SET_USER_STATUS = gql`
  mutation SetUserStatus($email: String, $isActive: Boolean) {
    setUserStatus(email: $email, isActive: $isActive) {
      success
    }
  }
`;

export function useSetUserStatusMutation(options?: any) {
  return useMutation(SET_USER_STATUS, options)
}


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
