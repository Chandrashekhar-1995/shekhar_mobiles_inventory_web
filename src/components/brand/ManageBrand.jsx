import React from "react";
import CreateBrand from "./CreateBrand";
import ManageBrandTable from "./ManageBrandTable";

const ManageBrand = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateBrand/>
      </div>
      <div className="p-4">
        <ManageBrandTable/>
      </div>
    </div>
  )
};

export default ManageBrand;