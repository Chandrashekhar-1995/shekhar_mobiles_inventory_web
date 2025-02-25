import React, { useState } from "react";
import axios from "axios";

const PurchaseDashboard = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
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
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default PurchaseDashboard;
