import { useEffect, useState } from "react";
import { socket } from "../clients/socket";
import type { UserDTO } from "../types/user";
import { useAuth } from "./useAuth";

export const useActiveUsers = () => {
  const { user } = useAuth();
  const [activeUsers, setActiveUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    if (!user?.id) return;

    socket.emit("register-user", user.id);

    const handleActiveUsers = (users: UserDTO[]) => setActiveUsers(users);

    socket.emit("get-active-users");
    socket.on("active-users", handleActiveUsers);

    const interval = setInterval(() => {
      socket.emit("get-active-users");
    }, 10000);

    return () => {
      clearInterval(interval);
      socket.off("active-users", handleActiveUsers);
    };
  }, [user]);

  return activeUsers;
};
