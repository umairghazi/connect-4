import { createContext, useEffect, useMemo, useState, ReactNode } from "react";
import { getUser } from "../api/user";
import type { UserDTO } from "../types/user";

interface AuthContextType {
  isLoggedIn: boolean;
  user: UserDTO | null;
  token: string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  updateLoginInfo: (token: string, user: UserDTO) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// --- Cookie helpers ---
function getCookie(name: string): string | null {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] ?? null
  );
}

function setCookie(name: string, value: string, days = 1) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

// --- Auth Provider ---
export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [token, setToken] = useState(() => getCookie("c4-new-token") ?? "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [user, setUser] = useState<UserDTO | null>(null);

  // Fetch user on load if token exists
  useEffect(() => {
    if (!token) return;

    // async function requestUser() {
    //   try {
    //     const user = await getUser();
    //     setUser(user);
    //     setIsLoggedIn(true);
    //   } catch (error) {
    //     console.log("Error fetching user:", error);
    //     setToken("");
    //     setIsLoggedIn(false);
    //     setUser(null);
    //   }
    // }
    // requestUser();
    getUser()
      .then((fetchedUser) => {
        setUser(fetchedUser);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setToken("");
        setIsLoggedIn(false);
        setUser(null);
      });
  }, [token]);

  const updateLoginInfo = (newToken: string, newUser: UserDTO) => {
    setCookie("c4-new-token", newToken);
    setToken(newToken);
    setUser(newUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCookie("c4-new-token", "", 0); // expire cookie
    setToken("");
    setUser(null);
    setIsLoggedIn(false);
  };

  const value = useMemo(
    () => ({
      token,
      isLoggedIn,
      user,
      setIsLoggedIn,
      updateLoginInfo,
      logout,
    }),
    [token, isLoggedIn, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
