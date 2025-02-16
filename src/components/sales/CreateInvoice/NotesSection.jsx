import React from 'react'

const NotesSection = ({ formData, handleChange }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-2">
      <label htmlFor="customerNote" className="block text-sm font-medium text-gray-700">
        Customer Note
      </label>
      <textarea
        id="customerNote"
        name="customerNote"
        value={formData.customerNote}  // Bind to formData
        onChange={handleChange}        // Update formData on change
        className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        rows="4"
        placeholder="Enter any notes for the customer"
      />
    </div>
  );
};

export default NotesSection;
