import React from "react";
import CreateRepairProcess from "./processComponent/CreateRepairProcess";
import ManageRepairProcessTable from "./processComponent/ManageRepairProcessTable";

const ManageRepairProcess = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateRepairProcess/>
      </div>
      <div className="p-4">
        <ManageRepairProcessTable/>
      </div>
    </div>
  )
}

export default ManageRepairProcess;