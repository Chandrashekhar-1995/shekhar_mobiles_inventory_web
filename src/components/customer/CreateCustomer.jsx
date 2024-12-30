import React, { useState } from "react";
import axios from "axios";

const CreateCustomer = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    // contactNumber: "",
    address: "",
    avatar:"",
    city: "",
    state: "",
    pinCode: "",
    country:"",
    gender:"",
    dateOfBirth: "",
    marrigeAniversary: "",
    panNo: "",
    // gstin: "",
    // gstType: "Unregistered",
    // tradeName: "",
    accountType: "Debit",
    openingBalance: "",
    documentType: "",
    documentNo: "",
    creditAllowed: "No",
    creditLimit: "",
    remark: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7777/api/v1/auth/customer/create",
        formData
      );
      console.log("Customer Created:", response.data);
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-100 rounded-lg shadow-lg w-[80%] max-w-4xl pt-0 p-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold mb-4 text-sm">Customer Information</h2>
          <button onClick={onClose} className="hover:bg-red-600 rounded-lg p-2"> X </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
          {/*  Section 1 Profile Picture */}
          <div className="col-span-2 flex flex-col items-center">
            <div className="w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xs">Profile Pic</span>
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              <button type="button" className="px-2 py-1 bg-green-500 text-white rounded text-xs w-full sm:w-auto mb-2">
                Upload
              </button>
              <button type="button" className="px-2 py-1 bg-blue-500 text-white rounded text-xs w-full sm:w-auto mb-2">
                Capture
              </button>
              <button type="button" className="px-2 py-1 bg-red-500 text-white rounded text-xs w-full sm:w-auto">
                Remove
              </button>
            </div>
          </div>


          {/* Section 2 Form Fields */}
          <div className="col-span-5 grid grid-cols-2 gap-4">

            {/* Name */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="col-span-1 text-xs font-medium">Full Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Billing Address *</label>
              <textarea
                name="address"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                rows="2"
                value={formData.address}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* City */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">City</label>
              <input
                type="text"
                name="city"
                placeholder="Kushinagar"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            {/* State */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">State</label>
              <input
                type="text"
                name="state"
                placeholder="Uttar Pradesh"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* Pin code */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">PIN Code</label>
              <input
                type="text"
                name="pinCode"
                placeholder="274207"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.pinCode}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Country</label>
              <input
                type="text"
                name="pinCode"
                placeholder="India"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.country}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Email ID</label>
              <input
                type="email"
                name="email"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Phone No *</label>
              <input
                type="text"
                name="phoneNo"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
            </div>

            {/* // Contact Number
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Contact No </label>
              <input
                type="text"
                name="contactNo"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </div> */}


            {/* Tax Details */}

            {/* PAN Number */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">PAN No</label>
              <input
                type="text"
                name="panNo"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.panNo}
                onChange={handleChange}
              />
            </div>

            {/* GSTIN */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">GSTIN</label>
              <input
                type="text"
                name="gstin"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.gstin}
                onChange={handleChange}
              />
            </div>           

            {/* GST Type */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">GST Type</label>
              <input
                type="text"
                name="gstType"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.gstType}
                onChange={handleChange}
              />
            </div>

            {/* Trade Name */}
            <div className="col-span-2 grid grid-cols-3">
              <label className="text-xs font-medium">Trade Name</label>
              <input
                type="text"
                name="tradeName"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs"
                value={formData.tradeName}
                onChange={handleChange}
              />
            </div> 
          </div>



          {/* Section 3 Others Details */}
          <div className="col-span-5 grid grid-cols-2 gap-4">

            {/* Account Details */}
<div className="border border-gray-200 col-span-5 shadow-lg relative">
  <div className="absolute -top-2 left-2 bg-white px-2 text-sm font-semibold">
    Account Details
  </div>

  {/* Account Type */}
  <div className="col-span-2 grid grid-cols-3 m-2">
    <label className="block text-xs font-medium mb-1">Type *</label>
    <div className="flex items-center gap-4">
      <label className="flex items-center text-xs">
        <input
          type="radio"
          name="accountType"
          value="Debit"
          checked={formData.accountType === "Debit"}
          onChange={handleChange}
          className="mr-2"
        />
        Debit
      </label>
      <label className="flex items-center text-xs">
        <input
          type="radio"
          name="accountType"
          value="Credit"
          checked={formData.accountType === "Credit"}
          onChange={handleChange}
          className="mr-2"
        />
        Credit
      </label>
    </div>
  </div>

  {/* Opening Balance */}
  <div className="col-span-2 grid grid-cols-3 m-2">
    <label className="text-xs font-medium">Opening Balance</label>
    <input
      type="text"
      name="openingBalance"
      className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
      value={formData.openingBalance}
      onChange={handleChange}
    />
  </div>
</div>

            
            {/* Identity Details */}
          <div className="col-span-5 grid grid-cols-2 gap-4">

            <div className="border border-gray-200 col-span-5">
              Identity Details

            {/* Document Type */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Document Type</label>
              <input
                type="text"
                name="documentType"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.documentType}
                onChange={handleChange}
              />
            </div>

            {/* Document Number */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Document Number</label>
              <input
                type="text"
                name="documentNo"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.documentNo}
                onChange={handleChange}
              />
            </div>

            </div>



  
          </div>


          {/* Aniversary */}
          <div className="col-span-5 grid grid-cols-2 gap-4">

            <div className="border border-gray-200 col-span-5">
            Aniversary

            {/* Date of Birth  */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Document Type</label>
              <input
                type="text"
                name="documentType"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.documentType}
                onChange={handleChange}
              />
            </div>

            {/* Aniversary */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Document Number</label>
              <input
                type="text"
                name="documentNo"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.documentNo}
                onChange={handleChange}
              />
            </div>

            </div>



  
          </div>

          {/* Other Details */}
          <div className="col-span-5 grid grid-cols-2 gap-4">

            <div className="border border-gray-200 col-span-5">
            Other Details

            {/* Credit Allowed */}
<div className="col-span-2 grid grid-cols-3 m-2">
  <label className="block text-xs font-medium mb-1">Credit Allowed</label>
  <div className="flex items-center gap-4">
    <label className="flex items-center text-xs">
      <input
        type="radio"
        name="creditAllowed" // Correct name attribute
        value="Yes"
        checked={formData.creditAllowed === "Yes"}
        onChange={handleChange}
        className="mr-2"
      />
      Yes
    </label>
    <label className="flex items-center text-xs">
      <input
        type="radio"
        name="creditAllowed" // Correct name attribute
        value="No"
        checked={formData.creditAllowed === "No"}
        onChange={handleChange}
        className="mr-2"
      />
      No
    </label>
  </div>
</div>


            {/* Credit Limit  */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Credit Limit</label>
              <input
                type="text"
                name="creditLimit"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.creditLimit}
                onChange={handleChange}
              />
            </div>

            {/* Remark */}
            <div className="col-span-2 grid grid-cols-3 m-2">
              <label className="text-xs font-medium">Remark</label>
              <input
                type="text"
                name="remark"
                className="col-span-2 border border-gray-300 rounded p-2 text-xs m-2"
                value={formData.remark}
                onChange={handleChange}
              />
            </div>

            </div>



  
          </div>
              
          </div> //



          {/* Button */}
          <div className="col-span-12 flex justify-end gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded text-xs">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;