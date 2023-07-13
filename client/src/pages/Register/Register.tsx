import { BadgeOutlined, EmailRounded, Key, Person } from "@mui/icons-material"
import { Button, InputAdornment, TextField, Typography } from "@mui/material"
import { KeyboardEvent, useCallback, useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useLoginUserMutation, useRegisterUserMutation } from "../../api"
import { Loading } from "../../components"
import { LocalAuthContext } from "../../contexts"

import './Register.css'

export const Register = () => {
  const { setIsLoggedIn, isLoggedIn, updateLoginInfo } = useContext(LocalAuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [avatar, setAvatar] = useState("")

  const [registerUser, { data: registerUserData, loading: registerUserLoading, error: registerUserErr }] = useRegisterUserMutation()

  const register = useCallback(async () => {
    await registerUser({
      variables: {
        email,
        password,
        displayName,
        avatar
      }
    })
  }, [avatar, displayName, email, password, registerUser])

  const handleRegister = useCallback(() => register(), [register])
  const handleSubmit = useCallback((evt: KeyboardEvent<HTMLDivElement>) => evt.code === 'Enter' && register(), [register])


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (!registerUserLoading && !registerUserErr && registerUserData) {
      const { token, user } = registerUserData?.registerUser

      if (!token || !user) return
      setIsLoggedIn(true);
      updateLoginInfo(token, user)
    }
  }, [registerUserData, registerUserErr, registerUserLoading, setIsLoggedIn, updateLoginInfo])

  if (registerUserLoading) {
    return <Loading />
  }

  return (
    <div className="register-container">
      <Typography variant="h3">
        Register
      </Typography>
      <TextField
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        label="Display Name"
        onKeyDown={handleSubmit}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <BadgeOutlined />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />
      <TextField
        onChange={(e) => setAvatar(e.target.value)}
        value={avatar}
        label="Avatar Url"
        onKeyDown={handleSubmit}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Person />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />
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
              <Key />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />
      <Button variant="contained" onClick={handleRegister}>
        Register
      </Button>
      <Typography variant="subtitle2">
        <Link to="/login">
          Login Here
        </Link>
      </Typography>
    </div>
  )
}