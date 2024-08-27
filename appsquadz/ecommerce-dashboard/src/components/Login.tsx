import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Button, TextField } from "@mui/material";
import { useAppDispatch } from "../store/hooks";
import { loginUser } from "../store/authSlice";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await dispatch(loginUser({ password, username }));
      if (response?.type === "auth/loginUser/rejected") {
        alert(response.payload);
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed:" + error);
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-screen flex items-center justify-center">
      <CardContent className="w-[450px] aspect-square flex flex-col justify-between px-10 border-[1px] border-black/20">
        <p className="text-3xl font-semibold text-center">Login</p>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            disabled={loading}
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            disabled={loading}
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            title="Login"
            fullWidth>
            Login
          </Button>
        </form>
        <p className="flex mx-auto">
          Not a Account ? &nbsp;
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default Login;
