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
        <div className="bg-base-100 border border-base-300 rounded-md shadow-sm p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                {/* Total Amount */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Total Amount</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        value={totalItemPrice}
                        readOnly
                    />
                </div>

                {/* Discount */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Discount Rs</label>
                    <input
                        type="number"
                        value={formData.discountAmount ?? ""}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleDiscountChange}
                    />
                </div>

                {/* Total Payable Amount */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Total Payable Amount</label>
                    <input
                        type="number"
                        value={formData.items.length > 0 ? totalItemPrice - (formData.discountAmount || 0) : "00.00"}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                    />
                </div>

                {/* Advance */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Advance</label>
                    <input
                        type="number"
                        name="advanceAmount"
                        value={formData.advanceAmount ?? 0}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}
                    />
                </div>

                {/* Payment Mode */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Payment Mode</label>
                    <select
                        name="paymentMode"
                        value={formData.paymentMode}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={handleChange}
                    >
                        <option value="cash">Cash</option>
                        <option value="qr_code">Phone Pay</option>
                        <option value="qr_code">Bharat Pay</option>
                        <option value="razorpay">Razoray</option>
                    </select>
                </div>

                {/* Remains */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">Remains</label>
                    <input
                        type="number"
                        value={(totalItemPrice - (formData.discountAmount || 0)) - (formData.advanceAmount || 0)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-2 text-xs focus:ring-indigo-500 focus:border-indigo-500"
                        readOnly
                    />
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;