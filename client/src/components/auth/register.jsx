import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { register } from "../../services/api";
import { Box, TextField, Button, Typography } from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/generate-content"); 
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed!");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
