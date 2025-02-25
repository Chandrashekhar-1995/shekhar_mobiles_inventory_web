import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';
import useBrand from "../../../hooks/useBrand";

const CreateBrand = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useBrand();

  const [formData, setFormData] = useState({
    brandName:undefined,
  });
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

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
      navigate(-1);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-100 rounded-lg shadow-lg w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Brand Information</h2>
          <button onClick={goBack} className="hover:bg-red-600 rounded-lg p-2"> X </button>
        </div>
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