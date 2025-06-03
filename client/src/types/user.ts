export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  createDate: string;
  updateDate: string;
  isActive: boolean;
}

export interface GetUserPayload {
  token?: string;
  email?: string;
  id?: string;
}
