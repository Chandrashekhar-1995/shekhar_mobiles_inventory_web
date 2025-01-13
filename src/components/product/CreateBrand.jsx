import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';

const CreateBrand = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    brandName:undefined,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/brand/create",
        formData,
        {
          withCredentials:true
        }
      );
      setSuccessMessage("Brand created successfully !");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white mb-8 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">New Brand</h2>
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
                        label="Brand Name"
                        variant="outlined"
                        fullWidth
                        name="brandName"
                        value={formData.brandName}
                        onChange={handleChange}
                        required
                      />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Create Brand"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBrand;