import React from "react";
import ManageFaultTable from "./ManageFaultTable";
import CreateFault from "./CreateFault";

const ManageFault = () => {

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateFault/>
      </div>
      <div className="p-4">
        <ManageFaultTable />
      </div>
    </div>
  )
}

export default ManageFault;