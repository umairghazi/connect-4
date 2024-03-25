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
