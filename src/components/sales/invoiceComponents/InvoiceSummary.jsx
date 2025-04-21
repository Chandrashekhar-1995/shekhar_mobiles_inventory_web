import React from "react";

const InvoiceSummary = ({ formData, totalItemPrice }) => {
  return (
    <div className="col-span-1 flex flex-col shadow-lg p-2">
      {/* Sub Amount */}
      {formData.items.length > 0 && (
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-600">Sub Amount:</label>
          <span className="text-sm font-medium text-gray-800">₹ {totalItemPrice}</span>
        </div>
      )}
      {/* Discount */}
      {formData.discountAmount > 0 && (
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-600">Discount:</label>
          <span className="text-sm font-medium text-gray-800">- ₹ {formData.discountAmount}</span>
        </div>
      )}
      {/* Total Amount */}
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-gray-800">Total Amount:</label>
        <span className="text-sm font-bold text-gray-800">
          ₹ {formData.items.length > 0 ? totalItemPrice - formData.discountAmount : "00.00"}
        </span>
      </div>
    </div>
  );
};

export default InvoiceSummary;