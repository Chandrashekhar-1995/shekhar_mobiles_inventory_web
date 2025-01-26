import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:7777/api/v1/";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    identifier: '', // For mobile number or email
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await axios.post(`${API_BASE_URL}auth/login`, formData, {
        withCredentials: true,
      });

      // Dispatch the user data to the store
      dispatch(addUser(res.data.data));

      setSuccessMessage("Login successful!");

      // Navigate to the related dashboard
      const role = res.data.data.designation;
      const userRoles = [
        "Relationship Manager",
        "Marketing Executive",
        "Manager",
        "Accountant",
        "Clerk",
        "Peon",
        "Office Boy",
        "Receptionist",
        "Trainee",
      ];

      if (role === "Admin") {
        navigate("/auth/admin");
      } else if (userRoles.includes(role)) {
        navigate("/auth/user");
      } else {
        navigate("/user/dashboard");
      }

    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {errorMessage && (
          <Alert severity="error" className="mb-4">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert severity="success" className="mb-4">
            {successMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="Mobile No or Email"
            variant="outlined"
            fullWidth
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Login"}
          </Button>
          <div>
            <p
              className="hover:text-blue-800 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Don't have an account? Signup
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
