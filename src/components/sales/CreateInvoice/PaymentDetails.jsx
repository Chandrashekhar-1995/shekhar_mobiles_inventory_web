import React from "react";

const PaymentDetails = ({ formData, handleChange }) => {
  return (
    <div className="col-span-1 flex flex-col shadow-lg p-2 relative">
      <div className="absolute -top-3 left-2 bg-gray-100 px-1 text-sm font-semibold">
        Payment
      </div>
      <div className="col-span-1 grid grid-cols-3 gap-1">
        {/* Payment Date */}
        <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Date</label>
        <input
          type="date"
          name="paymentDate"
          value={formData.paymentDate}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"
        />
        {/* Payment Mode */}
        <label className="text-xs font-medium text-gray-600 col-span-1">Mode</label>
        <select
          name="paymentMode"
          value={formData.paymentMode}
          className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="Phone Pay">Phone Pay</option>
          <option value="Bharat Pay">Bharat Pay</option>
        </select>
        {/* Transaction ID */}
        <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Txn. ID</label>
        <input
          type="text"
          name="transactionId"
          className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"
        />
        {/* Received Amount */}
        <label className="text-xs font-medium mt-2 text-gray-600 col-span-1">Amount</label>
        <input
          type="text"
          name="receivedAmount"
          value={formData.receivedAmount}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs col-span-2"
        />
      </div>
    </div>
  );
};

export default PaymentDetails;