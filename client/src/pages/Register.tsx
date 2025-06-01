import { BadgeOutlined, EmailRounded, Key, Person } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { type KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { useAuth } from "../hooks/useAuth";
import "./Register.css";

export const Register = () => {
  const { updateLoginInfo, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  const handleRegister = async () => {
    if (!email || !password || !displayName) {
      setError("Email, password, and display name are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { token, user } = await register({
        email,
        password,
        displayName,
        avatar,
        firstName: "",
        lastName: "",
      });
      updateLoginInfo(token, user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (evt: KeyboardEvent<HTMLDivElement>) => {
    if (evt.code === "Enter") handleRegister();
  };

  return (
    <div className="register-container">
      <Typography variant="h3">Register</Typography>

      <TextField
        onChange={(e) => setDisplayName(e.target.value)}
        value={displayName}
        label="Display Name"
        onKeyDown={handleSubmit}
        margin="normal"
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
        label="Avatar URL"
        onKeyDown={handleSubmit}
        margin="normal"
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
              <Key />
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
        onClick={handleRegister}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={22} /> : "Register"}
      </Button>

      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Already have an account? <Link to="/login">Login here</Link>
      </Typography>
    </div>
  );
};
