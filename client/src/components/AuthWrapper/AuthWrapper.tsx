import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import { useEffect } from "react"
import type { ReactNode } from "react"
import type { History } from 'history'

export interface IAuthWrapperProps {
  children: ReactNode
  history: History
}
export interface IAuthWrapperContentProps {
  children: ReactNode
}

const IS_USER_LOGGED_OUT_KEY = 'isUserLoggedOut'

const AuthWrapperContent = ({ children }: IAuthWrapperContentProps): JSX.Element => {

  const { isLoading, isAuthenticated, error, loginWithRedirect, logout } = useAuth0()

  useEffect(() => {
    window.localStorage.removeItem(IS_USER_LOGGED_OUT_KEY)

    const handleUserLoggedOut = (event: StorageEvent) => {
      if (event.key === IS_USER_LOGGED_OUT_KEY && event.newValue === "true") {
        window.localStorage.removeItem(IS_USER_LOGGED_OUT_KEY)
        logout({ returnTo: window.location.origin })
      }
    }
    window.addEventListener('storage', handleUserLoggedOut)
    return () => window.removeEventListener("storage", handleUserLoggedOut)
  }, [logout])

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect({ appState: { returnTo: window.location.pathname } })
    }
  }, [isAuthenticated, isLoading, loginWithRedirect])

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error("Authorization Error")
  }

  return children as JSX.Element
}

export const AuthWrapper = ({ children, history }: IAuthWrapperProps): JSX.Element => {
  const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT, REACT_APP_AUTH0_AUDIENCE } = process.env
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN || ""}
      clientId={REACT_APP_AUTH0_CLIENT || ""}
      redirectUri={window.location.origin}
      audience={REACT_APP_AUTH0_AUDIENCE}
      scope='read:api'
      cacheLocation="localstorage"
      onRedirectCallback={() => history.push(window.location.pathname)}
    >
      <AuthWrapperContent>{children}</AuthWrapperContent>
    </Auth0Provider>
  )
}