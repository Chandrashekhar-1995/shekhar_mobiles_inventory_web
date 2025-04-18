import React from 'react';

const OptionalFields = ({ formData, handleChange }) => {
  const fields = [
    { label: 'Sale Discount', name: 'saleDiscount' },
    { label: 'Low Level Limit', name: 'lowLevelLimit' },
    { label: 'Serial Number', name: 'serialNumber' },
    { label: 'Description', name: 'description' },
    { label: 'Warranty', name: 'warranty' },
    { label: 'Location', name: 'location' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map(({ label, name }) => (
        <div className="form-control" key={name}>
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
          <input
            type="text"
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      ))}
    </div>
  );
};

export default OptionalFields;
