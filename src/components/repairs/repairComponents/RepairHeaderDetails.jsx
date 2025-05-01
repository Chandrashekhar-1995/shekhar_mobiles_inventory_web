import React from "react";

const formatToIndianDate = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const RepairHeaderDetails = ({ data }) => {
  return (
    <div className="border border-gray-300 rounded-md shadow-sm p-4 bg-white mb-4">
      <h3 className="text-sm font-semibold mb-3">Repair Invoice Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div><span className="font-medium">Repair No:</span> {data.repairNumber}</div>
        <div><span className="font-medium">Booking Date:</span> {formatToIndianDate(data.bookingDate)}</div>
        <div><span className="font-medium">Customer Name:</span> {data.customerName}</div>
        <div><span className="font-medium">Mobile:</span> {data.mobileNumber}</div>
        <div><span className="font-medium">Address:</span> {data.address}</div>
        <div><span className="font-medium">Book By:</span> {data.bookBy}</div>
        <div><span className="font-medium">Private Note:</span> {data.privateNote}</div>
        <div><span className="font-medium">Customer Note:</span> {data.customerNote}</div>
      </div>
    </div>
  );
};

export default RepairHeaderDetails;
