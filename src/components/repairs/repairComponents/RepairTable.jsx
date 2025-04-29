import React from "react"; 

const RepairTable = ({ formData }) => {
  return (
    <div className="bg-yellow-100 mx-2 mt-6 mb-4">
      <table className="w-full" style={{ height: "300px", tableLayout: "fixed" }}>
        {/* Header */}
        <thead className="bg-blue-500 text-white">
          <tr className="bg-blue-500 text-white text-left">
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "10%" }}>S.No.</th>
            <th className="font-medium text-xs pl-2 py-2 text-left" style={{ width: "30%" }}>Item</th>
            <th className="font-medium text-xs pl-1 py-2 text-left" style={{ width: "20%" }}>Brand</th>
            <th className="font-medium text-xs pl-1 py-2 text-left" style={{ width: "20%" }}>Model No</th>
            <th className="font-medium text-xs px-4 py-2 text-left" style={{ width: "20%" }}>Repair Price</th>
          </tr>
        </thead>
        {/* Body */}
        <tbody className="align-top">
          {formData.repairing.length > 0 &&
            formData.repairing.map((r, index) => (
              <tr key={index} className="text-gray-700 align-top">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="pl-2 py-2">{r.type}</td>
                <td className="pl-1 py-2">{r.brandName}</td>
                <td className="pl-1 py-2">{r.modelNumber}</td>
                <td className="px-4 py-2">{r.repairPrice}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RepairTable;