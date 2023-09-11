import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    username: null,
    name: null,
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
  });