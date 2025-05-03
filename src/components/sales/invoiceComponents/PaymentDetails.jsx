import React from "react";

const PaymentDetails = ({ formData, setFormData, handleChange, totalItemPrice }) => {
  const handleDiscountChange = (e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev,
      discountAmount: value >= 0 ? value : 0,
    }));
  };
  return (
    <div className="border border-base-300 rounded-md shadow-sm p-4 bg-base-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {/* Total amount */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Total Amount</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm text-xs"
            value={totalItemPrice}
            readOnly
          />
        </div>

        {/* Discount */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Discount Rs</span>
          </label>
          <input
            type="number" 
            value={formData.discountAmount ?? ""}
            className="input input-bordered input-sm text-xs"
            onChange={handleDiscountChange}
          />
        </div>

        {/* Total Payble amount */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Total Payable Amount</span>
          </label>
          <input
            type="number" 
            value={ formData.repairing?.length > 0 ? totalItemPrice - (formData.discountAmount || 0)
      : "00.00"
  }
  className="input input-bordered input-sm text-xs"
  readOnly
/>
        </div>

        {/* Advance */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Advance</span>
          </label>
          <input
            type="number" 
            name="advanceAmount"
            value={formData.advanceAmount ?? 0}
            className="input input-bordered input-sm text-xs"
            onChange={handleChange}
          />
        </div>

        {/* Payment Mode */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Payment Mode</span>
          </label>
          
          <select
            name="paymentMode"
            value={formData.paymentMode}
            className="select select-bordered select-sm text-xs"
            onChange={handleChange}
          >
            <option value="cash">Cash</option>
            <option value="qr_code">Phone Pay</option>
            <option value="qr_code">Bharat Pay</option>
            <option value="razorpay">Razoray</option>
          </select>
        </div>

        {/* Sesh */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-xs">Remains</span>
          </label>
          <input
            type="number" 
            value={(totalItemPrice - (formData.discountAmount || 0)) - (formData.advanceAmount || 0)
              }
            className="input input-bordered input-sm text-xs"
            readOnly
          />
        </div>

      </div>
    </div>
  );
};

export default PaymentDetails;