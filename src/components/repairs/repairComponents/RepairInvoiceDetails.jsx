import React from "react";

const RepairInvoiceDetails = ({ formData, handleChange }) => {
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
 
        {/* Repair Number */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Repair Number</span>
          </label>
          <input
            type="text"
            name="repairNumber"
            className="input input-bordered input-sm text-xs"
            value={formData.repairNumber}
            onChange={handleChange}
          />
        </div>

        {/* Booking Date */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Booking Date</span>
          </label>
          <input
            type="date"
            name="bookingDate"
            className="input input-bordered input-sm text-xs"
            value={formData.bookingDate || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default RepairInvoiceDetails;
