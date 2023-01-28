import { createContext, useEffect, useState } from "react";

import { useGetUser } from "../api";

import type { SetState } from "../definitions";

interface ILocalAuthContext {
  isLoggedIn: boolean
  setIsLoggedIn: SetState<boolean>
  user: any
  token: string
  updateLoginInfo: (token: string, user: any) => void
  logout: () => void
}

export const LocalAuthContext = createContext({} as ILocalAuthContext);

export const getCookie = (name: string) => {
  const cookieSplit = document.cookie.split('; ')
  const cookieObj = cookieSplit.reduce((acc: any, current) => {
    const [key, value] = current.split('=')
    acc[key] = value
    return acc
  }, {})
  return cookieObj[name]
};

export function stringifyOptions(options: any) {
  return Object.keys(options).reduce((acc, key) => {
    if (key === 'days') {
      return acc;
    } else {
      if (options[key] === false) {
        return acc;
      } else if (options[key] === true) {
        return `${acc}; ${key}`;
      } else {
        return `${acc}; ${key}=${options[key]}`;
      }
    }
  }, '');
}

export const setCookie = (name: string, value: string, options: any) => {
  const optionsWithDefaults = {
    days: 1,
    path: '/',
    ...options,
  };

  const expires = new Date(Date.now() + optionsWithDefaults.days * 864e5).toUTCString();

  document.cookie =
    name +
    '=' +
    encodeURIComponent(value) +
    '; expires=' +
    expires
  // stringifyOptions(optionsWithDefaults);
};

export const LocalAuthProvider = ({ children }: any) => {
  const cookieToken = getCookie('c4-token')

  const [isLoggedIn, setIsLoggedIn] = useState(cookieToken ? true : false)
  const [user, setUser] = useState({})
  const [token, setToken] = useState(cookieToken ?? "")

  const [getUser, { data, error }] = useGetUser()

  useEffect(() => {
    if (cookieToken) {
      getUser({
        variables: {
          token: cookieToken
        }
      })
    }
  }, [cookieToken, getUser])

  useEffect(() => {
    if (data) {
      setUser(data?.getUser)
    }
    if (error) {
      setIsLoggedIn(false)
      setUser({})
      setToken("")
    }
  }, [data, error])

  const updateLoginInfo = (token: string, user: any) => {
    setCookie('c4-token', token, user)
    setUser(user)
    setToken(token)
  }

  const logout = () => {
    setCookie('c4-token', "", { days: 0 })
    setUser({})
    setToken("")
    setIsLoggedIn(false)
  }

  return (
    <LocalAuthContext.Provider value={{
      token,
      isLoggedIn,
      user,
      setIsLoggedIn,
      updateLoginInfo,
      logout
    }}>
      {children}
    </LocalAuthContext.Provider>
  )
}