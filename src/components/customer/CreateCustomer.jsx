import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';

const CreateCustomer = () => {
  const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    avatar:"",                // optional
    name: "",                 // required   
    address: "",              // required   
    city:undefined,           // optional   
    state: undefined,         // optional   
    pinCode:undefined,        // optional   
    country:undefined,        // optional   
    email:undefined,          // optional   
    contactNumber: undefined,        // optional   
    mobileNumber: "",         // required   
    panNo: "",                // optional   
    gstin: "",                // optional   
    gstType: "Unregistered",  // optional   
    tradeName: "",            // optional   
    accountType: "Debit",     // optional   
    openingBalance: 0,        // optional   
    documentType: "",         // optional   
    documentNo: "",           // optional   
    gender:undefined,            // optional
    refferedBy:"",            // optional
    dateOfBirth: undefined,  // optional  
    marrigeAniversary: undefined,    // optional  
    creditAllowed: "No",      // optional   
    creditLimit: 0,           // optional  
    remark: "",               // optional   
    bio:"",                   // optional
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
        "http://localhost:7777/api/v1/auth/customer/create",
        formData,
        {
          withCredentials:true
        }
      );
      setSuccessMessage("Customer Creared successful !");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Customer Information</h2>
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
        <div className="space-y-4">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
          </div>
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <TextField
            label="State"
            variant="outlined"
            fullWidth
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <TextField
            label="PinCode"
            variant="outlined"
            fullWidth
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
          />
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          /> */}
          <TextField
            label="Reffered By"
            variant="outlined"
            fullWidth
            name="refferedBy"
            value={formData.refferedBy}
            onChange={handleChange}
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />

          {/* Tax Details */}
          <div className="space-y-4">
            <TextField
              label="Pan Number"
              variant="outlined"
              fullWidth
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
            />
            <TextField
              label="GSTIN"
              variant="outlined"
              fullWidth
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
            />
            <TextField
              label="GST Type"
              variant="outlined"
              fullWidth
              name="gstType"
              value={formData.gstType}
              onChange={handleChange}
            />
            <TextField
              label="Trade Name"
              variant="outlined"
              fullWidth
              name="tradeName"
              value={formData.tradeName}
              onChange={handleChange}
            />
          </div>



          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer