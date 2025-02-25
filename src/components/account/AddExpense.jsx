import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const AddExpense = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, name: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7777/api/v1/auth/customer/create", formData);
      console.log("Customer Created:", response.data);
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        backgroundColor: "#ffffff",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Add New Customer
      </Typography>
      <TextField
        label="Name"
        name="name"
        fullWidth
        required
        value={formData.name}
        onChange={handleChange}
        sx={{ marginBottom: "16px" }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        required
        value={formData.password}
        onChange={handleChange}
        sx={{ marginBottom: "16px" }}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Create
      </Button>
    </Box>
  );
};

export default AddExpense;
