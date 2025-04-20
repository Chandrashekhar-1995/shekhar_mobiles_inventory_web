import React from "react";

const InvoiceTable = ({ formData }) => {
  return (
    <div className="bg-yellow-100 mx-2 mt-6 mb-4">
      <table className="w-full" style={{ height: "300px", tableLayout: "fixed" }}>
        {/* Header */}
        <thead className="bg-blue-500 text-white">
          <tr className="bg-blue-500 text-white text-left">
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>S.No.</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "29%" }}>Item Name</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Quantity</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Unit</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Unit Price</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Net Price</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Disc (%)</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "9%" }}>Amount</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody className="align-top">
          {formData.items.length > 0 &&
            formData.items.map((item, index) => (
              <tr key={index} className="text-gray-700 align-top">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{item.productName}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">{item.unit}</td>
                <td className="px-4 py-2">{item.mrp}</td>
                <td className="px-4 py-2">{item.salePrice}</td>
                <td className="px-4 py-2">{item.discount > 0 ? item.discount : ""}</td>
                <td className="px-4 py-2">{item.total}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;