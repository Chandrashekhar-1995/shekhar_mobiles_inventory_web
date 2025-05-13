import React from "react";

const MobileActionButtons = ({
  onSalesClick,
  onRepairClick,
  onPurchaseClick,
}) => (
  <div className="col-span-12 flex justify-around p-2 bg-white shadow-md">
    <button
      className="p-2 bg-blue-500 text-white rounded"
      onClick={onSalesClick}
    >
      New Sale
    </button>
    <button
      className="p-2 bg-green-500 text-white rounded"
      onClick={onRepairClick}
    >
      Book Repair
    </button>
    <button
      className="p-2 bg-purple-500 text-white rounded"
      onClick={onPurchaseClick}
    >
      New Purchase
    </button>
  </div>
);

export default MobileActionButtons;
