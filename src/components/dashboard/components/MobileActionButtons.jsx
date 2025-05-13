import React from "react";

const MobileActionButtons = () => {
  return (
    <div className="col-span-12 flex justify-around p-2 bg-white shadow-md">
      <button className="p-2 bg-blue-500 text-white rounded">Sales</button>
      <button className="p-2 bg-green-500 text-white rounded">Repairs</button>
      <button className="p-2 bg-purple-500 text-white rounded">Purchases</button>
    </div>
  );
};

export default MobileActionButtons
