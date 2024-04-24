import { EmailRounded, Password } from "@mui/icons-material"
import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import { KeyboardEvent, useCallback, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useLoginUserMutation, useSetUserStatusMutation } from "../../api"
import { Loading } from "../../components"
import { LocalAuthContext } from "../../contexts"

import './Login.css'

export const Login = () => {
  const { setIsLoggedIn, isLoggedIn, updateLoginInfo } = useContext(LocalAuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [loginUser, { data: loginUserData, loading: loginUserLoading, error: loginUserErr }] = useLoginUserMutation()
  const [setUserStatus, { data: userStatusData, loading: userStatusLoading, error: userStatusErr }] = useSetUserStatusMutation()

  const login = useCallback(async () => {
    await loginUser({
      variables: {
        email,
        password
      }
    })
    await setUserStatus({
      variables: {
        email,
        isActive: true
      }
    })
  }, [email, loginUser, password, setUserStatus])

  const handleLogin = useCallback(() => login(), [login])
  const handleSubmit = useCallback((evt: KeyboardEvent<HTMLDivElement>) => evt.code === 'Enter' && login(), [login])

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (!loginUserLoading && !loginUserErr && loginUserData) {
      const { token, user } = loginUserData?.loginUser
      if (!token || !user) return
      setIsLoggedIn(true);
      updateLoginInfo(token, user)
    }
  }, [loginUserData, loginUserErr, loginUserLoading, setIsLoggedIn, setUserStatus, updateLoginInfo])

  if (loginUserLoading) {
    return <Loading />
  }

  return (
    <div className="login-container">
      <div className="heading-container">
        <Typography variant="h3">
          Login
        </Typography>
      </div>
      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="Email"
        onKeyDown={handleSubmit}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <EmailRounded />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        label="Password"
        type="password"
        onKeyDown={handleSubmit}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Password />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <Typography variant="subtitle2">
        <Link to="/register">
          Register Here
        </Link>
      </Typography>
    </div>
  )
}