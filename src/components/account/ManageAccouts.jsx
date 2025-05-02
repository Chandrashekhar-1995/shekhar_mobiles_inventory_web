import React from "react";
import CreateRepairProcess from "../repairs/processComponent/CreateRepairProcess";
import ManageRepairProcessTable from "../repairs/processComponent/ManageRepairProcessTable";

const ManageAccounts = () => {
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

export default ManageAccounts;