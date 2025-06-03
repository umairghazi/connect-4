import { useEffect, useState } from "react";
import type { UserDTO } from "../types/user";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";

export const useActiveUsers = () => {
  const { user } = useAuth();
  const { registerUser, getActiveUsers, onActiveUsers } = useSocket();
  const [activeUsers, setActiveUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    registerUser(user.id);
    getActiveUsers();

    const removeListener = onActiveUsers((users) => setActiveUsers(users));

    const interval = setInterval(() => {
      getActiveUsers();
    }, 10000);

    return () => {
      clearInterval(interval);
      removeListener();
    };
  }, [getActiveUsers, onActiveUsers, registerUser, user?.id]);

  return activeUsers;
};
