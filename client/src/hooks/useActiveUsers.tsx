import { useEffect, useState } from "react";
import type { UserDTO } from "../types/user";
import { useAuth } from "./useAuth";
import { useSocket } from "./useSocket";

export const useActiveUsers = () => {
  const { user } = useAuth();
  const { registerUser, onActiveUsers } = useSocket();
  const [activeUsers, setActiveUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    registerUser(user.id);

    const removeListener = onActiveUsers((users) => {
      setActiveUsers(users);
    });

    return () => {
      removeListener();
    };
  }, [onActiveUsers, registerUser, user?.id]);

  return activeUsers;
};
