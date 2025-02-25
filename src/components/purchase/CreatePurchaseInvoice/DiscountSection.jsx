import React from 'react';

const DiscountSection = ({
  formData,
  handleChange,
  handlefinalDiscountChange,
}) => {
  const totalItemQuantity = formData.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {/* Total Quantity */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Total Quantity</label>
        <input
          type="text"
          className="border bg-yellow-100 border-gray-300 rounded px-2 py-1 text-xs"
          value={totalItemQuantity}
          readOnly // Marked as read-only
        />
      </div>

      {/* Purchase By */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Purchase By</label>
        <select
          name="purchaseBy"
          value={formData.purchaseBy}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
          onChange={handleChange}
        >
          <option value="chanddra shekhar">Chanddra Shekhar</option>
          <option value="manoj yadav">Manoj Yadav</option>
        </select>
      </div>

      {/* Discount */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Discount Rs</label>
      </div>
      <div className="col-span-1 flex flex-col">
        <input
          type="number"
          value={formData.discountAmount}
          onChange={handlefinalDiscountChange}
          className="border border-gray-300 rounded px-2 py-1 text-xs"
          placeholder="discount in rs"
        />
      </div>

      {/* Add Shipping */}
      <div className="col-span-1 flex flex-col">
        <label className="text-xs font-medium text-gray-600">Add Shipping</label>
      </div>
    </>
  );
};

export default DiscountSection;