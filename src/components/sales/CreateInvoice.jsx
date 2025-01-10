import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, CircularProgress, Alert, IconButton, InputAdornment } from '@mui/material';

const CreateInvoice = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showMoreFields, setShowMoreFields] = useState(false);

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
    <div className="flex items-center justify-center mb-8 bg-gray-100">
      <div className="w-full max-w-sm bg-white mb-8 p-6 rounded-lg shadow-md">
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
          {/* Required Fields */}
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

          {/* Toggle Button */}
          <Button
            variant="outlined"
            fullWidth
            className="mt-4"
            onClick={() => setShowMoreFields(!showMoreFields)}
          >
            {showMoreFields ? "Hide Additional Fields" : "More Fields"}
          </Button>

          {/* Optional Fields */}
          {showMoreFields && (
            <div className="space-y-4">
              {/* Customer Details */}
              <div className="space-y-4">
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
              </div>

              {/* Others Details */}
              <div className="space-y-4">
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
              </div>

              {/* Tax Details */}
              <div className="border border-gray-300 col-span-5 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                  Tax Details
                </div>

                {/* PAN Number */}
                <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                  <label className="text-xs font-medium p-2">PAN No</label>
                  <input type="text" name="panNo" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.panNo} onChange={handleChange} />
                </div>

                {/* GSTIN */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium p-2">GSTIN</label>
                  <input type="text" name="gstin" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.gstin} onChange={handleChange} />
                </div>           

                {/* GST Type */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium p-2">GST Type</label>
                  <input type="text" name="gstType" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.gstType} onChange={handleChange} />
                </div>

                {/* Trade Name */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium p-2">Trade Name</label>
                  <input type="text" name="tradeName" className="col-span-2 border border-gray-300 rounded p-2 text-xs" value={formData.tradeName} onChange={handleChange} />
                </div> 
              </div>

              {/* Section 3 Others Details */}
              <div className="space-y-4">
                {/* Accounts Details */}
                <div className="border border-gray-300 col-span-5 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                  Account Details
                </div>

                {/* Account Type */}
                <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                    <label className="block text-xs font-medium mb-1 p-2">Type *</label>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center text-xs">
                        <input type="radio" name="accountType" value="Debit" checked={formData.accountType === "Debit"} onChange={handleChange} className="mr-2"/> Debit
                        </label>

                        <label className="flex items-center text-xs">
                        <input type="radio" name="accountType" value="Credit" checked={formData.accountType === "Credit"} onChange={handleChange} className="mr-2"/> Credit
                        </label>
                    </div>
                </div>

                {/* Opening Balance */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                    <label className="text-xs font-medium pt-4">Opening Balance</label>
                    <input type="text" name="openingBalance" className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2" value={formData.openingBalance} onChange={handleChange} />
                </div>
                </div>

                {/* Identity Details */}
                <div className="border border-gray-300 col-span-5 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Identity Details
                </div>

                  {/* Document Type */}
                  <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                      <label className="text-xs font-medium pt-4"> Document Type</label>
                      <input type="text" name="documentType" className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"  value={formData.documentType} onChange={handleChange} />
                  </div>

                  {/* Document Number */}
                  <div className="col-span-2 grid grid-cols-3 m-2">
                      <label className="text-xs font-medium pt-4">Document Number</label>
                      <input type="text" name="documentNo" className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2" value={formData.documentNo} onChange={handleChange} />
                  </div>
                </div>
                  
                {/* Important Dates */}
                <div className="border border-gray-300 col-span-5 relative">
                <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Important Dates
                </div>
                {/* Date of Birth  */}
                <div className="col-span-2  grid grid-cols-3 m-2 mt-7">
                  <label className="text-xs   font-medium pt-4">Date of   Birth</label>
                  <input type="date"  name="dateOfBirth"   className="col-span-2   border border-gray-300  rounded p-2 text-xs m-2"   value={formData.  dateOfBirth} onChange=  {handleChange} />
                </div>

                {/* Aniversary */}
                <div className="col-span-2  grid grid-cols-3 m-2">
                  <label className="text-xs   font-medium   pt-4">Aniversary</label>
                  <input type="date"  name="marrigeAniversary"   className="col-span-2   border border-gray-300  rounded p-2 text-xs m-2"   value={formData. marrigeAniversary} onChange= {handleChange} />
                </div>
                </div>

                {/* Others Details */}
                <div className="border border-gray-300 col-span-5 relative">
                  <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
                    Other Details
                </div>

                {/* Credit Allowed */}
                <div className="col-span-2 grid grid-cols-3 m-2 mt-7">
                  <label className="block text-xs font-medium mb-1">Credit Allowed</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center text-xs">
                      <input type="radio" name="creditAllowed" value="Yes" checked={formData.     creditAllowed === "Yes"} onChange={handleChange} className="mr-2" /> Yes
                    </label>
                    <label className="flex items-center text-xs">
                      <input type="radio" name="creditAllowed" value="No" checked={formData.      creditAllowed === "No"} onChange={handleChange} className="mr-2" /> No
                    </label>
                  </div>
                </div>

                {/* Credit Limit  */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium pt-4">Credit Limit</label>
                  <input type="text" name="creditLimit" className="col-span-2 border    border-gray-300 rounded p-2 text-xs m-2" value={formData.creditLimit} onChange=   {handleChange} />
                </div>

                {/* Remark */}
                <div className="col-span-2 grid grid-cols-3 m-2">
                  <label className="text-xs font-medium">Remark</label>
                  <textarea name="remark" className="col-span-2 border border-gray-300 rounded p-2    text-xs" rows="2" value={formData.remark} onChange={handleChange} ></textarea>
                </div>
                </div> 
              </div>
              
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} className="text-white" /> : "Create Customer"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice