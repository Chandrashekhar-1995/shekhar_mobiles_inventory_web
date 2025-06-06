import React from "react";

const InvoiceDetails = ({ formData, handleChange }) => {
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Invoice Type */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Invoice Type</span>
          </label>
          <select
            id="invoiceType"
            name="invoiceType"
            className="select select-bordered select-sm text-xs"
            value={formData.invoiceType}
            onChange={handleChange}
          >
            <option value="non_gst">Non GST</option>
            <option value="gst">GST</option>
            <option value="bill_of_supply">Bill of Supply</option>
          </select>
        </div>

        {/* Invoice Number */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Invoice Number</span>
          </label>
          <input
            type="text"
            name="invoiceNumber"
            className="input input-bordered input-sm text-xs"
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
        </div>

        {/* Invoice Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Date</span>
          </label>
          <input
            type="date"
            name="date"
            className="input input-bordered input-sm text-xs"
            value={formData.date || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
