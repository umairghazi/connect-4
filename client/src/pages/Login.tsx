import "./Login.css";
import { EmailRounded, Password } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { type KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { setUserStatus } from "../api/user";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const { isLoggedIn, updateLoginInfo } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { token, user } = await login(email, password);

      // await setUserStatus(user.email, true);

      updateLoginInfo(token, user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === "Enter") handleLogin();
  };

  return (
    <div className="login-container">
      <div className="heading-container">
        <Typography variant="h3">Login</Typography>
      </div>

      <TextField
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        label="Email"
        onKeyDown={handleSubmit}
        margin="normal"
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
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <Password />
              &nbsp;
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={22} /> : "Login"}
      </Button>

      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </Typography>
    </div>
  );
};
