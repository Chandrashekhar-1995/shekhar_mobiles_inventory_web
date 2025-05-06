import React from "react";
import CreateRepairProcess from "./processComponent/CreateRepairProcess";
import ManageRepairProcessTable from "./processComponent/ManageRepairProcessTable";
import RepairProcessForm from "./processComponent/RepairProcessForm";

const ManageRepairProcess = () => {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <CreateRepairProcess/>
        <RepairProcessForm/>
      </div>
      <div className="p-4">
        <ManageRepairProcessTable/>
      </div>
    </div>
  )
}

export default ManageRepairProcess;