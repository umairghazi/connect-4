import { EmailRounded, Password } from "@mui/icons-material"
import { Button, InputAdornment, TextField } from "@mui/material"
import { ChangeEvent, KeyboardEvent, MouseEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useLoginUserMutation } from "../../api"
import { Loading } from "../../components"
import { LocalAuthContext } from "../../contexts"

import './Login.css'

export const Login = () => {
  const { setIsLoggedIn, isLoggedIn, updateLoginInfo } = useContext(LocalAuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleUsernameChange = (evt: ChangeEvent<HTMLInputElement>) => setEmail(evt.target.value)
  const handlePasswordChange = (evt: ChangeEvent<HTMLInputElement>) => setPassword(evt.target.value)

  const [loginUser, { data: loginUserData, loading: loginUserLoading, error: loginUserErr }] = useLoginUserMutation()

  const login = async () => {
    await loginUser({
      variables: {
        email,
        password
      }
    })
  }

  const handleLogin = async (evt: MouseEvent<HTMLButtonElement>) => {
    login()
  }
  const handleSubmit = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === 'Enter') {
      login()
    }
  }


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
  }, [loginUserData, loginUserErr, loginUserLoading, setIsLoggedIn, updateLoginInfo])

  if (loginUserLoading) {
    return <Loading />
  }

  return (
    <div className="login-container">
      <div className="email-container">
        <TextField
          onChange={handleUsernameChange}
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
      </div>
      <div className="password-container">
        <TextField
          onChange={handlePasswordChange}
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
      </div>
      <div className="login-btn-container">
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}