import React, { useState } from "react";
import { Card, CardContent, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../store/authSlice";
import { useAppDispatch } from "../store/hooks";

const Signup: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(signUpUser({ username, email, password })).unwrap();
      alert("Signed Up successfully !");
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error);
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-screen flex items-center justify-center">
      <CardContent className="w-[450px] aspect-square flex flex-col justify-between px-10 border-[1px] border-black/20">
        <p className="text-3xl font-semibold text-center">Sign Up</p>
        <form onSubmit={handleSignup}>
          <TextField
            label="Username"
            fullWidth
            disabled={loading}
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            disabled={loading}
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            disabled={loading}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            title="Sign Up"
            type="submit"
            disabled={loading}
            variant="contained"
            color="primary"
            fullWidth>
            Sign Up
          </Button>
        </form>
        <p className="flex mx-auto">
          Already have an account? &nbsp;
          <span
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default Signup;
