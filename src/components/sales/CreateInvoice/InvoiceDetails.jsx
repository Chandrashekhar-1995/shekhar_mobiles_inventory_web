import React from "react";

const InvoiceDetails = ({ formData, handleChange }) => {
  return (
    <div className="border border-gray-300 relative">
      <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
        Invoice information
      </div>
      <div className="grid grid-cols-3 gap-4 items-center mx-2 mt-4 mb-2">
        {/* Invoice Type */}
        <div className="col-span-1 flex flex-col">
          <label htmlFor="invoiceType" className="text-xs font-medium text-gray-600">
            Invoice Type
          </label>
          <select
            id="invoiceType"
            name="invoiceType"
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            value={formData.invoiceType}
            onChange={handleChange}
          >
            <option value="Non GST">Non GST</option>
            <option value="GST">GST</option>
            <option value="Bill of Supply">Bill of Supply</option>
          </select>
        </div>
        {/* Invoice Number */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            value={formData.invoiceNumber}
            onChange={handleChange}
            readOnly
          />
        </div>
        {/* Invoice Date */}
        <div className="col-span-1 flex flex-col">
          <label className="text-xs font-medium text-gray-600">Date</label>
          <input
            type="date"
            name="date"
            className="border border-gray-300 rounded px-2 py-1 text-xs"
            value={formData.date || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;