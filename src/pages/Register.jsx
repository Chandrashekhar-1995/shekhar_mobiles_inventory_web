import React, { useState } from 'react';
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    mobileNumber:"",
    address:"",
    password: "",
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
    const res = await axios.post("http://localhost:7777/api/v1/auth/register", formData,{
      withCredentials:true
    });

    // Dispatch the user data to the store
    dispatch(addUser(res.data.data));

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

    setSuccessMessage("Login successful!");
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
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

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

          <TextField label="Name" variant="outlined" fullWidth name="name" value={formData.name} onChange={handleChange} required />

          <TextField label="Email" variant="outlined" fullWidth name="email" value={formData.email} onChange={handleChange} required />

          <TextField label="Mobile Number" variant="outlined" fullWidth name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />

          <TextField label="Address" variant="outlined" fullWidth name="address" value={formData.address} onChange={handleChange} required />

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

          <Button type="submit" variant="contained" fullWidth className="bg-blue-500 hover:bg-blue-600 text-white" disabled={loading} >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Register"}
          </Button>
          <div>
          <p className="hover:text-blue-800" onClick={() => navigate('/login')}>
    Already have an account? Login
</p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
