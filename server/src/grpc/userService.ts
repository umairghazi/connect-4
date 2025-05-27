import { UserController } from "../controllers/userController";
import { sendUnaryData, ServerUnaryCall, ServiceError, UntypedServiceImplementation } from "@grpc/grpc-js";
import { AuthResponse, LoginRequest, RegisterRequest, StatusRequest, StatusResponse, UserDTO, UserListResponse, UserQueryRequest } from "../generated/user_pb";


export const userServiceImpl: UntypedServiceImplementation = {
  async getUser (call: ServerUnaryCall<UserQueryRequest, UserDTO>, callback: sendUnaryData<UserDTO>) {
    try {
      const userData = await UserController.getUser(call.request.toObject());
      const user = new UserDTO();
      user.setId(userData.id);
      user.setEmail(userData.email);
      user.setFirstname(userData.firstName);
      user.setLastname(userData.lastName);
      user.setDisplayname(userData.displayName);
      user.setAvatar(userData.avatar);
      user.setIsactive(userData.isActive);
      user.setCreatedate(userData.createDate);
      user.setUpdatedate(userData.updateDate);
      callback(null, user);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async getActiveUsers (call: ServerUnaryCall<LoginRequest, AuthResponse>, callback: sendUnaryData<AuthResponse>) {
    try {
      const usersData = await UserController.getActiveUsers();
      const response = new UserListResponse();
      const userList = usersData.map((u: any) => {
        const user = new UserDTO();
        user.setId(u.id);
        user.setEmail(u.email);
        user.setFirstname(u.firstName);
        user.setLastname(u.lastName);
        user.setDisplayname(u.displayName);
        user.setAvatar(u.avatar);
        user.setIsactive(u.isActive);
        user.setCreatedate(u.createDate);
        user.setUpdatedate(u.updateDate);
        return user;
      });
      response.setUsersList(userList);
      callback(null, response as any);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async loginUser (call: ServerUnaryCall<LoginRequest, AuthResponse>, callback: sendUnaryData<AuthResponse>) {
    try {
      const data = await UserController.loginUser(call.request.toObject());
      const response = new AuthResponse();
      const user = new UserDTO();
      Object.assign(user, data.user); // Or map field-by-field like above
      response.setUser(user);
      response.setToken(data.token);
      callback(null, response);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async registerUser (call: ServerUnaryCall<RegisterRequest, AuthResponse>, callback: sendUnaryData<AuthResponse>) {
    try {
      const data = await UserController.registerUser(call.request.toObject());
      const response = new AuthResponse();
      const user = new UserDTO();
      Object.assign(user, data.user);
      response.setUser(user);
      response.setToken(data.token);
      callback(null, response);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  },

  async setUserStatus (call: ServerUnaryCall<StatusRequest, StatusResponse>, callback: sendUnaryData<StatusResponse>) {
    try {
      const data = await UserController.setUserStatus(call.request.toObject());
      const res = new StatusResponse();
      res.setSuccess(data.success);
      callback(null, res);
    } catch (err) {
      callback(err as ServiceError, null);
    }
  }
};
