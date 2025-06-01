import { useEffect, useState } from "react";
import { socket } from "../clients/socket";
import type { UserDTO } from "../types/user";
import { useAuth } from "./useAuth";

export const useActiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState<UserDTO[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (!user?.id) return;
    console.log("Registering user for active users:", user.id);
    socket.emit("register-user", user.id);

    const handleActiveUsers = (users: UserDTO[]) => {
      setActiveUsers(users);
    };

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
